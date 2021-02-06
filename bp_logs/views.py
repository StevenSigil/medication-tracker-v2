from rest_framework import viewsets, permissions

from .models import BPLog
from . import serializers


class BPLogView(viewsets.ModelViewSet):
    queryset = BPLog.objects.all()
    serializer_class = serializers.BPLogSerializer
    permissions = [permissions.IsAuthenticated]
