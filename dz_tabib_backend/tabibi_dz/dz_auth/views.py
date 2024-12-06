# Django Imports
from django.conf import settings
from django.contrib import messages
from django.contrib.sessions.models import Session
from django.core.mail import send_mail, EmailMultiAlternatives, BadHeaderError
from django.db import models
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

from jwt import decode
from jwt.exceptions import DecodeError, ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes

# Models & Serializers Imports
from .models import PatientManager, DoctorManager
from .serializers import RegisterSerializer,OTPSerializer,PersonalInfoSerializer

# External Libraries
import random
import requests





from django.shortcuts import render

# Create your views here.
def generate_otp():
    return ''.join(random.choices('0123456789', k=6))


def send_otp(email, otp):
    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp}'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    send_mail(subject, message, email_from, recipient_list)


# views.py
class RegisterStep1View(APIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Initialize the serializer with the request data
        serializer = RegisterSerializer(data=request.data)
        
        # Validate the serializer
        if serializer.is_valid():
            email = serializer.validated_data['email']
            phone = serializer.validated_data['phone']
            password = serializer.validated_data['password']
            
            # Check if email or phone already exist in the database (using raw SQL)
            if PatientManager.filter_patient_by('email', email):
                return Response({"error": "Email is already in use"}, status=status.HTTP_400_BAD_REQUEST)
            if PatientManager.filter_patient_by('phone', phone):
                return Response({"error": "Phone number is already in use"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Store the information in the session
            request.session['step1'] = {'email': email, 'phone': phone, 'password': password}
            
            # Generate an OTP and store it in the session
            otp = generate_otp()
            request.session['otp'] = otp
            request.session.save() 
            print("nihao ",request.session['otp'])
            
            # Send OTP (could be email or SMS)
            send_otp(email, otp)
             
            # Return success response
            return Response({"message": "OTP sent to email"}, status=status.HTTP_201_CREATED)
        
        # If validation fails, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            # Inside your view
            print("hello ",request.session.keys())  # Check if OTP is being stored in session

            otp = serializer.validated_data['otp']
            stored_otp = request.session.get('otp')

            if not stored_otp:
                return Response({"error": "OTP not found or expired"}, status=status.HTTP_400_BAD_REQUEST)

            if otp == stored_otp:
                request.session['otp_verified'] = True
                return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RegisterStep3View(APIView):
    serializer_class = PersonalInfoSerializer

    def post(self, request, *args, **kwargs):
        if not request.session.get('otp_verified'):
            return Response({"error": "OTP verification is required"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PersonalInfoSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            personal_info = serializer.validated_data
            # Store personal information in session
            request.session['step3'] = personal_info
            request.session.save()  # Ensure session is saved
            # Store personal information in session
            return Response({"message": personal_info}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

import re

from datetime import datetime

def format_birthdate(birthdate_str):
    """
    Formats a birthdate from YYMMDD to YYYY-MM-DD.
    """
    formatted_date = datetime.strptime(birthdate_str, '%y%m%d').strftime('%Y-%m-%d')

    return formatted_date
def extract_details(parsed_text):
    """
    Extracts the name, last name, birthdate, and ID number from the OCR parsed text.
    """
    name_pattern = r'Prénom\(s\):\s*([\w\s]+)'
    last_name_pattern = r'Nom:\s*(\w+)'
    birthdate_pattern = r'(\d{6})(?=\d{1}[MF])'  # Updated pattern for birthdate

    id_number_pattern = r'IDDZA(\d+)'

    name_match = re.search(name_pattern, parsed_text)
    last_name_match = re.search(last_name_pattern, parsed_text)
    birthdate_match = re.search(birthdate_pattern, parsed_text)
    id_number_match = re.search(id_number_pattern, parsed_text)

    name = name_match.group(1).strip().split('\n')[0] if name_match else ''
    last_name = last_name_match.group(1).strip() if last_name_match else ''
    birthdate = format_birthdate(birthdate_match.group(1) if birthdate_match else '') 
    id_number = id_number_match.group(1) if id_number_match else ''

    return {
        'name': name,
        'last_name': last_name,
        'birth_date': birthdate,
        'id_number': id_number
    }

def ocr_space_api(file_path, overlay=False, api_key='YOUR_API_KEY', language='eng'):
    payload = {
        'isOverlayRequired': overlay,
        'apikey': api_key,
        'language': language,
        'OCREngine' : 2,
    }
    with open(file_path, 'rb') as f:
        r = requests.post('https://api.ocr.space/parse/image',
                          files={file_path: f},
                          data=payload,
                          )
    return r.json()


import os
from .forms import UploadFileForm  # Make sure to import your form

class RegisterStep4View(APIView):
    def post(self, request, *args, **kwargs):
        form = UploadFileForm(request.POST, request.FILES)
        
        # Validate form
        if not form.is_valid():
            return Response({"error": "Invalid form submission"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save the file to the server
        file_name = file.name
        file_path = os.path.join(os.path.dirname(__file__), 'uploads', file_name)
        
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        # Perform OCR on the uploaded file
        result = ocr_space_api(file_path, api_key='K87236353188957')
        
        # Check for errors in OCR response
        if not result or 'ParsedResults' not in result:
            return Response({"error": "Failed to extract text from the image"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        parsed_text = result.get('ParsedResults', [{}])[0].get('ParsedText', '')
        ocr_data = extract_details(parsed_text)

        # Retrieve personal info from session
        personal_info = request.session.get('step3', None)
        if not personal_info:
            return Response({"error": "Personal info is missing from session"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the ID already exists
        if PatientManager.fetch_patient_by_id(ocr_data.get('id_number')):
            return Response({"error": "ID number is already in use"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if step1 data is missing from session
        if 'step1' not in request.session:
            return Response({"error": "Step 1 data is missing in session"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get city_id from step3 session data
        city_id = personal_info.get('city_id')
        
        # Handle missing city_id
        if not city_id:
            return Response({"error": "City ID is missing from session"}, status=status.HTTP_400_BAD_REQUEST)
        from django.db import connection

        card_id=ocr_data.get('id_number')
        name=str(ocr_data.get('name'))
        last_name=str(ocr_data.get('last_name'))
        email=str(request.session['step1']['email'])
        phone=int(request.session['step1']['phone'])
        password=str(request.session['step1']['password'])
        birth_date=str(ocr_data.get('birth_date')) 
        try:
            PatientManager.create_patient(
                card_id=card_id,
                name=name,
                last_name=last_name,
                email=email,
                phone=phone,
                password=password,
                city_id=city_id,
                birth_date=birth_date
            )
        except Exception as e:
            return Response({"error": f"Failed to create patient:{ocr_data}, {card_id},{name},{last_name},{email},{phone},{password},{city_id},{birth_date},{str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Client created successfully"}, status=status.HTTP_201_CREATED)
    


import jwt 
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Ensure email and password are provided
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch user based on email
        user_queryset = PatientManager.filter_patient_by('email', email)
        if not user_queryset:
            raise AuthenticationFailed('User not found')
        
        


        user = user_queryset
        if not PatientManager.check_patient_password(email, password):
            raise AuthenticationFailed('Invalid password')
        # Create JWT payload without expiration
        payload = {
            'id': user['card_id'],

            
       }

        # Encode the token
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        # Prepare the response
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {'jwt': token}
        response.status_code = status.HTTP_200_OK
        
        return response
    