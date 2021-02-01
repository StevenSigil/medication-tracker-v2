import uuid
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db import models


# class Medication(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4)
#     user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='medication')
#     name = models.CharField(max_length=100, default='null')
#     when_taken = models.DateTimeField(default=datetime.datetime.now())
#     recommended_time = models.TimeField(default=datetime.time(1, 00))



class Medication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4())
    name = models.CharField(max_length=100, default='err')
    strength = models.CharField(max_length=30)
    date_created = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.Empty, related_name='medication_created_by')
