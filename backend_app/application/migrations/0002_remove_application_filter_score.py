# Generated by Django 4.0.10 on 2024-11-03 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='filter_score',
        ),
    ]
