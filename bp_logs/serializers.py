from django.utils import timezone
from rest_framework import serializers

from .models import BPLog


class BPLogSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    date_time = serializers.DateTimeField(default=timezone.now)
    sys = serializers.IntegerField(required=True)
    dia = serializers.IntegerField(required=True)
    pulse = serializers.IntegerField(required=True)
    note = serializers.CharField(max_length=300, allow_blank=True, required=False)

    class Meta:
        model = BPLog
        fields = ('id', 'user', 'date_time', 'sys', 'dia', 'pulse', 'note')


class DateTimeSerializer(serializers.Serializer):
    start = serializers.DateTimeField(default=timezone.now())
    end = serializers.DateTimeField(default=timezone.now())
    time_offset = serializers.IntegerField(default=0)
