from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import datetime, timedelta


from .models import BPLog
from . import serializers

import csv
import json
from django.http import HttpResponse


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

    @action(methods=['GET', 'POST'], detail=False)
    def bp_csv(self, request):
        """
        Allows a user to download data from BPLog instances via POST req. containing a start/end date/time.
        Expecting date/time format as "%Y-%m-%dT%H:%M:%S" - defaults to timezone.now()
        """
        from django.http import HttpResponse
        import csv

        # Basic serializer expecting a start/end time as data
        self.serializer_class = serializers.DateTimeSerializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if request.method == 'POST':
            start = serializer.validated_data['start']
            end = serializer.validated_data['end']
            # Retrieves the BPLog's between start/end date/time(s) 
            # Start has 1 day offset for lazy UTC conversion per user feedback
            bp_logs = BPLog.objects.filter(user=request.user, date_time__date__gte=start - timedelta(days=1), date_time__date__lte=end)
            bp_filtered_values = bp_logs.values_list('date_time', 'sys', 'dia', 'pulse', 'note')

            # Prep CSV document as 'response' object
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="users.csv"'
            writer = csv.writer(response)
            writer.writerow(['date_time', 'systolic', 'diastolic', 'pulse', 'note'])

            # Writes data from above date/time query to csv response obj. and returns as downloadable file.
            for value in bp_filtered_values:
                writer.writerow(value)
            return response

        return Response(serializer.data, status.HTTP_200_OK)
