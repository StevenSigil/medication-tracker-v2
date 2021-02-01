from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Medication

User = get_user_model()


class MedicationSerializer(serializers.ModelSerializer):
    """
    Base serializer for retrieving info on 1 or more medications.
    """
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    strength = serializers.CharField(max_length=30, required=True)
    date_created = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Medication
        fields = ('id', 'name', 'strength', 'date_created', 'created_by')

    def get_created_by(self, med_obj):
        created_by = User.objects.get(id=med_obj.created_by.id)
        return created_by.__str__()


class MedicationCreateSerializer(serializers.ModelSerializer):
    """
    Serializer to allow a user to create a Medication instance
    """
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=100, required=True)
    strength = serializers.CharField(max_length=30, required=True)

    class Meta:
        model = Medication
        fields = ('id', 'name', 'strength')

    def validate_name(self, name):
        return name.capitalize()

    def validate_strength(self, strength):
        return strength.capitalize()


class MedicationBasicUpdate(serializers.ModelSerializer):
    """
    Serializer for a user to update the name/strength for a single medication instance.
    Ideally, a user won't use this but will create a new medication with other dosage.
    """
    name = serializers.CharField(max_length=100)
    strength = serializers.CharField(max_length=30)

    class Meta:
        model = Medication
        fields = ('name', 'strength')
