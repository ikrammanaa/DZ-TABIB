from .views import DeclareFreeSessions, ChangeSessions, book_appointment
from django.urls import path

urlpatterns = [
    path('doctor/declare_free_sessions/', DeclareFreeSessions.as_view(), name='declare_free_sessions'),
    path('doctor/change_sessions/', ChangeSessions.as_view(), name='change_sessions'),
    path('available_sessions/', DeclareFreeSessions.as_view(), name='available_sessions'),
    path('<int:doctor_id>/book_appointment/', book_appointment.as_view(), name='book_appointment')
]