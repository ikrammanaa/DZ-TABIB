from .models import Adminsrator, DoctorForm, PatientManager, DoctorManager
from django.test import TestCase




class PatientAuthTests(TestCase):
    def setUp(self):
        self.patient_email = 'djihadbelkir@gmail.com'
        self.patient_password = 'djihad2004'
        PatientManager.create_patient('12345678', 'djihad', 'belkhir', self.patient_email, '0778889778', self.patient_password, 113, '1990-01-01')

    def test_patient_login(self):
        is_authenticated = PatientManager.check__password(self.patient_email, self.patient_password)
        self.assertTrue(is_authenticated, "The patient should be authenticated with the correct password")

    




