# Generated by Django 3.1.5 on 2021-02-06 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bp_logs', '0004_auto_20210206_0013'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bplog',
            name='log_notes',
        ),
        migrations.AddField(
            model_name='bplog',
            name='log_note',
            field=models.CharField(max_length=300, null=True, verbose_name='log_notes'),
        ),
    ]
