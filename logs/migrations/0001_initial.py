# Generated by Django 3.1.5 on 2021-02-02 03:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('medications', '0005_auto_20210201_1550'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('time_taken', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='MedicationAndQuantity',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('log', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='logged_quantity', to='logs.log')),
                ('medication', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='logged_quantity', to='medications.medication')),
            ],
        ),
        migrations.AddField(
            model_name='log',
            name='medication_quantities',
            field=models.ManyToManyField(related_name='logged_medications', to='logs.MedicationAndQuantity'),
        ),
        migrations.AddField(
            model_name='log',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='logs', to=settings.AUTH_USER_MODEL),
        ),
    ]