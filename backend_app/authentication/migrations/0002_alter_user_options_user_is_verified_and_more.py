# Generated by Django 5.1.3 on 2024-11-28 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AddField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False, help_text='Indicates whether the user is verified', verbose_name='Verified Status'),
        ),
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='Groups to which this user belongs', related_name='authentication_user_set', to='auth.group', verbose_name='User Groups'),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('super_admin', 'Super Admin'), ('admin', 'Admin'), ('executive', 'Executive')], default='executive', help_text='Role of the user within the application', max_length=20, verbose_name='User Role'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Permissions assigned to this user', related_name='authentication_user_permissions_set', to='auth.permission', verbose_name='User Permissions'),
        ),
    ]