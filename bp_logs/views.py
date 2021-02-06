from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import datetime, timedelta

from .models import BPLog
from . import serializers


class BPLogView(viewsets.GenericViewSet):
    queryset = BPLog.objects.all()
    serializer_class = serializers.BPLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    @action(methods=['GET', 'POST'], detail=False)
    def get_post_bp_logs(self, request):
        """
        GET: Returns the logs a user has submitted, from 2.5 days ago to now + 1 day (same as users_logs).
        POST: Allows for the creation of a new BPLog instance, then set to user's acct.
        """
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.validated_data['user'] = request.user
            new_log = BPLog.objects.create(**serializer.validated_data)
            new_log.save()
        query = self.get_queryset().filter(user=request.user,
                                           date_time__date__gte=datetime.now() - timedelta(days=3, hours=12),
                                           date_time__date__lte=datetime.now() + timedelta(days=1))
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
