# Generated by Django 5.1.3 on 2024-11-28 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_remove_user_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False, help_text='Indicates whether the user is verified', verbose_name='Verified Status'),
        ),
    ]
