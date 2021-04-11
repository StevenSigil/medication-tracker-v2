import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

User = get_user_model()


class Log(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='logs')
    time_taken = models.DateTimeField(default=timezone.now)
    medication_quantities = models.ManyToManyField('logs.MedicationAndQuantity',
                                                   related_name='logged_medications',
                                                   symmetrical=True)
    # total_dosage = models.CharField(max_length=15)    # NotImplemented at this time
    # notes = models.CharField(max_length=500)          # NotImplemented at this time

    def __str__(self):
        return f"{self.user.email} - {self.time_taken} {self.logged_quantity.all()}"


class MedicationAndQuantity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    medication = models.ForeignKey('medications.Medication', related_name='logged_quantity', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    log = models.ForeignKey(Log, related_name='logged_quantity', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.medication} {self.quantity}'