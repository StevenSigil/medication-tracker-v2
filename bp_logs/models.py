import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


class BPLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(get_user_model(), related_name='bp_logs', on_delete=models.CASCADE)
    date_time = models.DateTimeField(default=timezone.now)
    sys = models.IntegerField()
    dia = models.IntegerField()
    pulse = models.IntegerField()
    notes = models.CharField(max_length=300)
