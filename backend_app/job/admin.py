# admin.py
from django.contrib import admin
from .models import Job, MonthlyJobPost

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'employment_type', 'location', 'status', 'date_posted', 'expiry_date']
    list_filter = ['status', 'employment_type', 'location', 'date_posted', 'expiry_date']
    search_fields = ['title', 'description', 'location']
    ordering = ['-date_posted']
    readonly_fields = ['date_posted', 'date_closed', 'time_to_refill']

    fieldsets = (
        (None, {
            'fields': ('title', 'employment_type', 'description', 'location', 'status')
        }),
        ('Dates', {
            'fields': ('date_posted', 'expiry_date', 'date_closed')
        }),
        ('Statistics', {
            'fields': ('post_count',)
        }),
    )

@admin.register(MonthlyJobPost)
class MonthlyJobPostAdmin(admin.ModelAdmin):
    list_display = ['job', 'year', 'month', 'post_count']
    list_filter = ['year', 'month']
    search_fields = ['job__title']
    ordering = ['-year', '-month']

