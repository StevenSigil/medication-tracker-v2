from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response

from . import serializers
from .models import Medication


class MedicationView(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.MedicationSerializer
    serializer_classes = {
        'new_medication': serializers.MedicationCreateSerializer,
        'medication_to_user': serializers.UserAddRemoveFromMedication,
        'remove_medication': serializers.UserAddRemoveFromMedication,
        'delete_medication': serializers.UserAddRemoveFromMedication,
    }

    def list(self, request):
        """
        Returns a list of (all-at this time) medications => NOT IN USE ON FRONTEND
        """
        query = self.get_queryset()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['POST', ], detail=False)
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
    def medication_to_user(self, request, *args, **kwargs):
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
        
        res_data = self.serializer_class(medications, many=True, context=request, *args, **kwargs).data
        return Response(res_data, status=status.HTTP_202_ACCEPTED)

    @action(methods=['GET', 'POST'], detail=False)
    def remove_medication(self, request):
        """
        NOT IN USE AT THIS TIME - delete_medication() instead.
        POST: Removes a medication instance from a users list of medications assuming medication.id is passed.
        GET: Returns the medications a user is 'following'
        """
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            medication = Medication.objects.get(id=serializer.validated_data['id'])
            medication.users_taking.remove(request.user)
        medications = request.user.medications_taking
        res_data = self.serializer_class(medications, many=True).data
        return Response(res_data, status=status.HTTP_200_OK)

    @action(methods=['GET', 'POST'], detail=False)
    def delete_medication(self, request):
        """
        Deletes a medication instance entirely from database.
        """
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            medication = Medication.objects.get(id=serializer.validated_data['id'])
            medication.delete()
        medications = request.user.medications_taking
        res_data = self.serializer_class(medications, many=True).data
        return Response(res_data, status=status.HTTP_200_OK)

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
    NOT IN USE AT THIS TIME
    Provides a view for the user to update the medication name and/or the recommended time to be taken.
    """
    queryset = Medication.objects.all()
    serializer_class = serializers.MedicationBasicUpdate
    permissions = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class MedicationSearchView(ListAPIView):
    """
    NOT IN USE AT THIS TIME
    Filters medication instances be name/strength to save space on DB by having multiple users
    with the same medication object.
    """
    queryset = Medication.objects.all()
    serializer_class = serializers.MedicationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'strength']
