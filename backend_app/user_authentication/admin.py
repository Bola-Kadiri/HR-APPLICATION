from django.contrib import admin
from django.contrib.admin.models import LogEntry
from .models import UserAccount

# Set up the admin interface for UserAccount if necessary
class UserAccountAdmin(admin.ModelAdmin):
    model = UserAccount
