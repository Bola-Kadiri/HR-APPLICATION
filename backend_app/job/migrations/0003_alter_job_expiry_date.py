# Generated by Django 4.0.10 on 2024-11-03 07:46

import datetime
from django.db import migrations, models
from datetime import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_alter_job_expiry_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='expiry_date',
            field=models.DateField(default=datetime.datetime(2024, 12, 3, 7, 46, 39, 176083, tzinfo=timezone.utc)),
        ),
    ]
