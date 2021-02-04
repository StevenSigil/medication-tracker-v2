from django.core.exceptions import ImproperlyConfigured
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action

from django.utils.timezone import datetime, timedelta

from medications.models import Medication
from medications.serializers import MedicationSerializer
from .models import Log, MedicationAndQuantity
from . import serializers


class LogViewSet(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UsersLogsSerializer
    serializer_classes = {
        'create_log': serializers.CreateLog,
        'users_logs': serializers.UsersLogsSerializer,
        'delete_log': serializers.DeleteLogSerializer,
    }
    queryset = Log.objects.all()

    def list(self, request):
        query = self.get_queryset()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data)

    @action(methods=['POST', 'GET'], detail=False)
    def create_log(self, request, *args, **kwargs):
        """
        Creates a Log instance and many MedicationAndQuantity instances Expecting input as:
            {"medication_quantities": [{"medication": UUID, "quantity": int},...], "time_taken": datetime.datetime}
        """
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data, *args, **kwargs)
            serializer.is_valid(raise_exception=True)

            meds_and_qs = serializer.validated_data.pop('medication_quantities')
            log_entry = Log.objects.create(user=request.user, **serializer.validated_data)

            for values in meds_and_qs:
                m = MedicationAndQuantity()
                m.medication, m.quantity = values['medication'], values['quantity']
                m.log = log_entry
                m.save()
            final_serializer = serializers.UsersLogsSerializer(log_entry)
        else:
            query = Medication.objects.all()
            final_serializer = MedicationSerializer(query, many=True)
        return Response(final_serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['GET', ], detail=False)
    def users_logs(self, request):
        """
        Returns a list of the Log's a user has made from 2.5 days ago to now.
        Used on the main interaction screen - limited amount of data for api.
        """
        queryset = Log.objects.filter(user=request.user, time_taken__date__gt=datetime.now() - timedelta(days=3, hours=12))

        data = self.get_serializer(queryset, many=True).data
        return Response(data, status=status.HTTP_200_OK)

        def get_week_of_data(today):
            y_w_d = datetime.date(today).isocalendar()
            start = datetime.today()

    @action(methods=['POST', ], detail=False)
    def delete_log(self, request):
        """
        Deletes a Log associated with the user's account.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        log_id = serializer.validated_data['id']
        Log.objects.get(id=log_id).delete()
        return Response(f'Deleted log {log_id}', status=status.HTTP_202_ACCEPTED)

    def get_serializer_class(self):
        """
        Allows for more than a single serializer instance for this GenericViewSet via the serializer_classes dict.
        """
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
