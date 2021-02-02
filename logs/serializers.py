from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Log, MedicationAndQuantity
from medications.models import Medication
from medications.serializers import MedicationSerializer

User = get_user_model()


class MedicationAndQuantitySerialiser(serializers.ModelSerializer):
    class Meta:
        model = MedicationAndQuantity
        fields = ('medication', 'quantity')


class CreateLog(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    time_taken = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", default=timezone.now)
    medication_quantities = MedicationAndQuantitySerialiser(many=True)

    class Meta:
        model = Log
        fields = ('id', 'user', 'medication_quantities', 'time_taken')


class UsersLogsSerializer(serializers.ModelSerializer):
    medication_quantities = serializers.SerializerMethodField()

    class Meta:
        model = Log
        fields = ('id', 'medication_quantities', 'time_taken', 'user')

    def get_medication_quantities(self, obj):
        """obj is expected to be a Log object"""
        child = obj.logged_quantity
        m_and_q = MedicationAndQuantitySerialiser(child, many=True).data
        new_data = []
        for i in m_and_q:
            med = Medication.objects.get(id=i['medication'])
            med_serializer = MedicationSerializer(med).data
            med_serializer.pop('date_created')
            med_serializer['quantity'] = i['quantity']
            new_data.append(med_serializer)
        return new_data


class DeleteLogSerializer(serializers.Serializer):
    id = serializers.UUIDField()

    def validate_id(self, obj_id):
        log = Log.objects.get(id=obj_id)
        if not log:
            raise ValidationError('Log does not exist.')
        return obj_id
