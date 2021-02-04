# Generated by Django 3.1.5 on 2021-02-01 21:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.UUIDField(default=uuid.UUID('aebf0948-a81f-4265-ab73-023e3344bef1'), primary_key=True, serialize=False)),
                ('name', models.CharField(default='err', max_length=100)),
                ('strength', models.FloatField()),
                ('date_created', models.DateTimeField(default=datetime.datetime(2021, 2, 1, 14, 45, 28, 232085))),
                ('created_by', models.ForeignKey(on_delete=django.db.models.fields.Empty, related_name='medication_created_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]