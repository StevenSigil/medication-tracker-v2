# Generated by Django 3.1.5 on 2021-02-01 22:49

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('medications', '0003_auto_20210201_1451'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='id',
            field=models.UUIDField(default=uuid.UUID('2b4f6640-170f-4290-87a4-29c33707a58b'), primary_key=True, serialize=False),
        ),
    ]
