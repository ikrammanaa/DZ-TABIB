from django.urls import path
from . import views

urlpatterns = [
    path('doctor/<int:doctor_id>/available_slots/<str:date>/', views.get_available_slots, name='get_available_slots'),
    path('book_appointment/', views.book_appointment, name='book_appointment'),
    path('cancel_appointment/', views.cancel_appointment, name='cancel_appointment'),
    path('appointment_history/<int:patient_card_id>/', views.get_appointment_history, name='get_appointment_history'),
]
