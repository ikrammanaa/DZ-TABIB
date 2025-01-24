from .utils.mysql_helper import MySQLHelper
import json 
from django.http import JsonResponse
from .utils.mysql_helper import MySQLHelper

def get_available_slots(request, doctor_id, date):
    db = MySQLHelper()
    query = """
    SELECT slot_id, start_time, end_time, status 
    FROM appointment_slots 
    WHERE doctor_id = %s AND slot_date = %s
    AND status = 'available'
    """
    params = (doctor_id, date)
    available_slots = db.execute_query(query, params)
    db.close()
    return JsonResponse({'available_slots': available_slots})
def book_appointment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        patient_card_id = data['patient_card_id']
        doctor_id = data['doctor_id']
        slot_id = data['slot_id']
        consultation_type = data['consultation_type']  # 'in-person' or 'online'

        db = MySQLHelper()
        # Check if the slot is still available
        query = "SELECT status FROM appointment_slots WHERE slot_id = %s"
        slot_status = db.execute_query(query, (slot_id,))
        
        if slot_status and slot_status[0]['status'] == 'available':
            # Update the slot status to 'booked'
            update_query = "UPDATE appointment_slots SET status = 'booked' WHERE slot_id = %s"
            db.execute_update(update_query, (slot_id,))
            
            # Insert the appointment into the appointments table
            insert_query = """
            INSERT INTO appointments (doctor_id, patient_card_id, slot_id, consultation_type)
            VALUES (%s, %s, %s, %s)
            """
            db.execute_update(insert_query, (doctor_id, patient_card_id, slot_id, consultation_type))
            db.close()
            return JsonResponse({'message': 'Appointment booked successfully'})
        else:
            db.close()
            return JsonResponse({'message': 'Slot not available'}, status=400)
def cancel_appointment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        appointment_id = data['appointment_id']

        db = MySQLHelper()
        # Update the appointment status to 'cancelled'
        update_query = "UPDATE appointments SET status = 'cancelled' WHERE appointment_id = %s"
        db.execute_update(update_query, (appointment_id,))
        
        # Update the slot status back to 'available'
        select_query = "SELECT slot_id FROM appointments WHERE appointment_id = %s"
        slot = db.execute_query(select_query, (appointment_id,))
        if slot:
            update_slot_query = "UPDATE appointment_slots SET status = 'available' WHERE slot_id = %s"
            db.execute_update(update_slot_query, (slot[0]['slot_id'],))

        db.close()
        return JsonResponse({'message': 'Appointment cancelled successfully'})
def get_appointment_history(request, patient_card_id):
    db = MySQLHelper()
    query = """
    SELECT a.appointment_id, d.name as doctor_name, s.name as specialty, 
    a.appointment_date, a.consultation_type 
    FROM appointments a
    JOIN doctor d ON a.doctor_id = d.doctor_id
    JOIN specialty s ON d.specialty_id = s.specialty_id
    WHERE a.patient_card_id = %s
    """
    params = (patient_card_id,)
    history = db.execute_query(query, params)
    db.close()
    return JsonResponse({'history': history})
