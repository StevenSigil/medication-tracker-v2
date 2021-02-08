import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


class Medication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100, default='err')
    strength = models.CharField(max_length=30)
    date_created = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.Empty, related_name='medication_created_by')
    users_taking = models.ManyToManyField(get_user_model(), related_name='medications_taking', auto_created=False)

    def __str__(self):
        return f'{self.name} - {self.strength}'
