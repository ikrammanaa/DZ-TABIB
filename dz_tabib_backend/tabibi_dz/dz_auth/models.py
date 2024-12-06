
# Create your models here.
from django.db import connection

class PatientManager:
    @staticmethod
    def create_patient(card_id, name, last_name, email, phone, password, city_id, birth_date):
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO patient (card_id, name, last_name, email, phone, password, city_id, birth_date)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, [card_id, name, last_name, email, phone, password, city_id, birth_date])

    @staticmethod
    def fetch_all_patients():
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM patient")
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]

    @staticmethod
    def fetch_patient_by_id(card_id):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM patient WHERE card_id = %s", [card_id])
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
    @staticmethod
    def filter_patient_by(filter, obj):
        # Allowed filter fields to prevent SQL injection
        allowed_filters = ['card_id', 'name', 'last_name', 'email', 'phone', 'city_id', 'birth_date']
        
        if filter not in allowed_filters:
            raise ValueError(f"Invalid filter: {filter}")
        
        # Safe query execution with parameterized queries
        with connection.cursor() as cursor:
            query = f"SELECT * FROM patient WHERE {filter} = %s"
            cursor.execute(query, [obj])
            row = cursor.fetchone()
            
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
        
    @staticmethod
    def check_patient_password(email, password):
        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM patient WHERE email = %s", [email])
            row = cursor.fetchone()
            if row:
                if row[0] == password:
                    return True
            return False
    



class DoctorManager:
    @staticmethod
    def create_doctor(doctor_id, specialty_id, name, last_name, email, phone, password, address):
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO doctor (doctor_id, specialty_id, name, last_name, email, phone, password, address)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, [doctor_id, specialty_id, name, last_name, email, phone, password, address])

    @staticmethod
    def fetch_all_doctors():
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM doctor")
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]

    @staticmethod
    def filter_doctor_by(filter, obj):
        # Allowed filter fields to prevent SQL injection
        allowed_filters = ['doctor_id','specialty_id', 'name', 'last_name', 'email', 'phone','address']
        
        if filter not in allowed_filters:
            raise ValueError(f"Invalid filter: {filter}")
        
        # Safe query execution with parameterized queries
        with connection.cursor() as cursor:
            query = f"SELECT * FROM doctor WHERE {filter} = %s"
            cursor.execute(query, [obj])
            row = cursor.fetchone()
            
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
        
    @staticmethod
    def fetch_doctor_by_id(doctor_id):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM doctor WHERE doctor_id = %s", [doctor_id])
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
