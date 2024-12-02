from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'job', 'application_date', 'filter_score')  # Fields to display
    list_filter = ('application_date', 'job')  # Add filters for easier navigation
    search_fields = ('first_name', 'last_name', 'email', 'job__title')  # Search fields
    ordering = ('-application_date',)  # Order by most recent applications
    readonly_fields = ('application_date', 'filter_score')  # Make non-editable fields read-only in admin

