from django.contrib.auth import get_user_model
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response

from .models import Medication
from . import serializers


class MedicationView(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = serializers.MedicationSerializer
    serializer_classes = {
        'new_medication': serializers.MedicationCreateSerializer,
        'medication_to_user': serializers.UserAddRemoveFromMedication,
    }

    def list(self, request):
        """
        Returns a list of (all-at this time) medications
        """
        query = self.get_queryset()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['POST',], detail=False)
    def new_medication(self, request, *args, **kwargs):
        """
        Creates an instance of the Medication model and sets 'created_by' to the requesting user.
        """
        serializer = self.get_serializer(data=request.data, *args, **kwargs)
        serializer.is_valid(raise_exception=True)
        medication = Medication.objects.create(created_by=request.user, **serializer.validated_data)
        medication.users_taking.add(request.user)
        serializer = self.serializer_class(medication)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['POST', 'GET'], detail=False)
    def medication_to_user(self, request):
        """
        POST: Adds a user to a medication representing that user wants the drug on their dashboard.
        GET: Returns the medications a user is 'following'
        """
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            medication = Medication.objects.get(id=serializer.validated_data['id'])
            medication.users_taking.add(request.user)
        medications = request.user.medications_taking
        res_data = self.serializer_class(medications, many=True).data
        return Response(res_data, status=status.HTTP_202_ACCEPTED)

    def get_queryset(self):
        return Medication.objects.all()

    def get_serializer_class(self):
        """
        Allows for more than a single serializer instance for this GenericViewSet via the serializer_classes dict.
        """
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


class MedicationPartialUpdateView(GenericAPIView, UpdateModelMixin):
    """
    Provides a view for the user to update the medication name and/or the recommended time to be taken.
    """
    queryset = Medication.objects.all()
    serializer_class = serializers.MedicationBasicUpdate
    permissions = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class MedicationSearchView(ListAPIView):
    queryset = Medication.objects.all()
    serializer_class = serializers.MedicationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'strength']