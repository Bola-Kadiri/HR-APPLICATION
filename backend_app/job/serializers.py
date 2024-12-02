from rest_framework import serializers
from .models import Job, MonthlyJobPost
from django.db.models import Sum
from rest_framework.exceptions import ValidationError

class MonthlyJobPostSerializer(serializers.ModelSerializer):
    """Serializer for MonthlyJobPost model."""
    class Meta:
        model = MonthlyJobPost
        fields = ['year', 'month', 'post_count']

class JobSerializer(serializers.ModelSerializer):
    """Serializer for Job model with additional fields for monthly and yearly posts."""
    monthly_posts = serializers.SerializerMethodField()
    yearly_posts = serializers.SerializerMethodField()
    posting_details = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'date_posted', 'date_closed',
            'status', 'time_to_refill', 'monthly_posts', 'yearly_posts', 'posting_details', 
            'employment_type', 'location', 'expiry_date'
        ]
        read_only_fields = ['monthly_posts', 'yearly_posts', 'posting_details']

    def get_monthly_posts(self, obj):
        """Retrieve monthly post counts for the job."""
        monthly_data = MonthlyJobPost.objects.filter(job=obj).values('year', 'month').annotate(total_posts=Sum('post_count'))
        return monthly_data

    def get_yearly_posts(self, obj):
        """Retrieve yearly post counts for the job."""
        yearly_data = MonthlyJobPost.objects.filter(job=obj).values('year').annotate(total_posts=Sum('post_count'))
        return yearly_data

    def get_posting_details(self, obj):
        """Return posting details, including time to refill."""
        return {
            'title': obj.title,
            'date_posted': obj.date_posted,
            'date_closed': obj.date_closed,
            'time_to_refill': obj.time_to_refill
        }

    def validate_title(self, value):
        """Validate the uniqueness of the job title."""
        if Job.objects.filter(title=value).exists():
            raise ValidationError("A job with this title already exists.")
        return value
