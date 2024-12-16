
# Create your models here.
from django.db import connection

class Adminsrator :
    @staticmethod
    def filter_by(filter, obj):
        # Allowed filter fields to prevent SQL injection
        allowed_filters = ['id',  'email', 'phone','password']
        
        if filter not in allowed_filters:
            raise ValueError(f"Invalid filter: {filter}")
        
        # Safe query execution with parameterized queries
        with connection.cursor() as cursor:
            query = f"SELECT * FROM adminstrator WHERE {filter} = %s"
            cursor.execute(query, [obj])
            row = cursor.fetchone()
            
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
    @staticmethod
    def approve_doctor(doctor_id, approved):
        with connection.cursor() as cursor:
            if approved:
                # Add the doctor to the doctor table
                cursor.execute("""
                    INSERT INTO doctor (doctor_id, name, specialty_id,last_name,phone,email,password,address)
                    SELECT card_id, name, speciality, last_name,phone,email,password,city
                    FROM doctor_form
                    WHERE doctor_form.id= %s
                """, [doctor_id])
                
                # Remove the doctor from the doctor_form table
                
                # Remove the doctor from the doctor_form table
            cursor.execute("DELETE FROM doctor_form WHERE doctor_form.id = %s", [doctor_id])
    

    @staticmethod
    def fetch_all_doctor_forms():
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM doctor_form")
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
    @staticmethod
    def fetch_doctor_form_by_id(doctor_id):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM doctor_form WHERE doctor_id = %s", [doctor_id])
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
    
    @staticmethod
    def check_password(email, password):
        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM adminstrator WHERE email = %s", [email])
            row = cursor.fetchone()
            if row:
                if row[0] == password:
                    return True
            return False
    
        
class DoctorForm:



    @staticmethod
    def fetch_document_by_id(doctor_id):
        with connection.cursor() as cursor:
            cursor.execute("SELECT document FROM doctor_form WHERE id = %s", [doctor_id])
            row = cursor.fetchone()
            if row:
                return row[0]
            return None
    @staticmethod
    def filter_by_id(id):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM doctor_form WHERE id = %s", [id])
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                return dict(zip(columns, row))
            return None
    @staticmethod
    def create_form (email,phone,password,card_id,name ,last_name,birth_date,speciality,institut,experience,city_id,document):
        if document:
            file_data = document.read()  # Read the file content as binary data
        else:
            file_data = None
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO doctor_form (email,phone,password,card_id,name ,last_name,birth_date,speciality ,institut,experience,city,document)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s,%s)
            """, [email,phone,password,card_id,name ,last_name,birth_date,speciality,institut,experience,city_id,file_data])



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
    def filter_by(filter, obj):
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
    def check_password(email, password):
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
    def filter_by(filter, obj):
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
    @staticmethod
    def check_password(email, password):
        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM doctor WHERE email = %s", [email])
            row = cursor.fetchone()
            if row:
                if row[0] == password:
                    return True
            return False 