from rest_framework import serializers
from .models import BPLog


class BPLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BPLog
        fields = '__all__'
