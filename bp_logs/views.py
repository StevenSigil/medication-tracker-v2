from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from . import serializers
from .models import BPLog


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
                                           date_time__date__gte=timezone.datetime.now() - timezone.timedelta(days=3,
                                                                                                             hours=12),
                                           date_time__date__lte=timezone.datetime.now() + timezone.timedelta(days=1))
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET', 'POST'], detail=False)
    def download_bplogs(self, request):
        """
        Allows a user to download data from BPLog instances via POST req. containing a start/end datetime with a
        timezone offset. Time_offset is expected to be in minutes, start/end datetime expected in (non TZ) ISO format.
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
            time_offset = serializer.validated_data['time_offset']
            time_delta = timezone.timedelta(minutes=time_offset)

            # Retrieves the BPLog's between start/end date/time(s) 
            bp_logs = BPLog.objects.filter(user=request.user, date_time__date__gte=start, date_time__date__lte=end)
            bp_filtered_values = bp_logs.values_list('date_time', 'sys', 'dia', 'pulse', 'note')

            # Prep CSV document as 'response' object
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="users.csv"'
            writer = csv.writer(response)
            writer.writerow(['date', 'time', 'systolic', 'diastolic', 'pulse', 'note'])

            # Formats and writes Log object to csv response before returning as downloadable file.
            for log in bp_filtered_values:
                log = list(log)
                converter = log[0] - time_delta
                log[0] = converter.date()
                log.insert(1, converter.time())
                writer.writerow(log)
            return response

        return Response(serializer.data, status.HTTP_200_OK)
