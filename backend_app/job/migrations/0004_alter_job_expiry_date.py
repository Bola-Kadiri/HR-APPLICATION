# Generated by Django 4.0.10 on 2024-11-03 07:49

import datetime
from django.db import migrations, models
from datetime import timezone  # Add this import for timezone support

class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_alter_job_expiry_date'),  # Adjust the dependency as needed
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='expiry_date',
            field=models.DateField(default=datetime.datetime(2024, 12, 3, 7, 48, 59, 895751, tzinfo=timezone.utc)),
        ),
    ]

