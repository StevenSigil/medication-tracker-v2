from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

import random

from medications.models import Medication
from logs.models import Log, MedicationAndQuantity
from bp_logs.models import BPLog
from .demo_defaults import default_medications


# ---------------------------------------------------------------------------- #
# ----------------------------------- AUTH ----------------------------------- #
def get_and_authenticate_user(email, password):
    """
    Returns a CustomUser obj if the email/password credentials exist.
    """
    user = authenticate(username=email, password=password)
    if not user:
        raise serializers.ValidationError(
            {'email': ['Invalid email or password'], 'password': ['Invalid email or password']})
    return user


def create_user_accont(email, password, first_name="", last_name="", **extra_fields):
    """
    After validating the request, this function creates the user instance with provided/validated credentials.
    """
    user = get_user_model().objects.create_user(email=email, password=password, first_name=first_name,
                                                last_name=last_name, **extra_fields)
    return user

# ---------------------------------------------------------------------------- #
# ----------------------------------- DEMO ----------------------------------- #
def prepare_demo_account_info(user):
    """Resets the demo account from any previous data another user may have 
    entered on this acct.
    """
    reset_medications_to_default(user)
    create_random_medication_logs(user)
    create_random_BP_logs(user)

def reset_medications_to_default(user):
    """Deletes any old medications and add defaults back to profile."""
    user = get_user_model().objects.get(id=user.id)
    user.medications_taking.all().delete()
    print('\nPrevious medications for Demo accout delted from db.\nStoring new ones now...\n')
    for medication in default_medications:
        medication = Medication.objects.create(created_by=user, name=medication['name'], strength=medication['strength'])
        medication.users_taking.add(user)

def create_random_medication_logs(user):
    """Deletes previous demo logs created by other users and creates 
    8 random log entries from the default medications for the demo acct.
    """
    log_count = 8
    users_medications = user.medications_taking.all()

    user.logs.all().delete()    # delete previous logs

    med_names = []  # get the names of available medications
    for med_obj in users_medications:
        med_names.append(med_obj)

    for log in range(log_count):
        log_entry = Log.objects.create(user=user)
        random_choice1 = random.randint(0, len(med_names)-1)  # random medication
        
        mq = MedicationAndQuantity()
        mq.medication, mq.quantity = med_names[random_choice1], random.randint(0, 4) 
        mq.log = log_entry
        mq.save()

def create_random_BP_logs(user):
    """Deletes previous demo logs created by other users and 
    creates 8 random blood pressure log entries for the demo acct.
    """
    log_count = 8

    user.bp_logs.all().delete()

    for log in range(log_count):
        # random ints for sys dia puls values
        sys = random.randint(65, 140)
        dia = random.randint(70, 90)
        pulse = random.randint(60,  175)

        log_obj = BPLog.objects.create(user=user, sys=sys, dia=dia, pulse=pulse)
        log_obj.save()

