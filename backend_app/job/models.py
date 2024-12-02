import uuid
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import timedelta
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.core.exceptions import ValidationError

def default_expiry_date():
    """Set a default expiry date 30 days from now."""
    return (timezone.now() + timedelta(days=30)).date()

class Job(models.Model):
    """Model representing a job listing."""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('filled', 'Filled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, verbose_name='Job Title')
    employment_type = models.CharField(max_length=50, choices=[("FT", "Full-Time"), ("PT", "Part-Time"), ("CT", "Contract")], verbose_name='Employment Type')
    description = models.TextField(verbose_name='Job Description')
    location = models.CharField(max_length=255, verbose_name='Location')
    date_posted = models.DateTimeField(auto_now_add=True, verbose_name='Date Posted')
    expiry_date = models.DateField(default=default_expiry_date, verbose_name='Expiry Date')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, verbose_name='Job Status')
    date_closed = models.DateTimeField(null=True, blank=True, verbose_name='Date Closed')
    post_count = models.IntegerField(
        default=0, 
        verbose_name='Post Count', 
        null=True,  # Allow null in the database
        blank=True  # Allow empty value in forms
    )

    def __str__(self):
        return self.title

    def clean(self):
        """Ensure that there is no other job with the same title and different status."""
        if Job.objects.exclude(id=self.id).filter(title=self.title).exists():
            raise ValidationError("A job with this title already exists. Please choose a different title or update the existing one.")

    def save(self, *args, **kwargs):
        """Override save to validate title uniqueness before saving the job."""
        self.clean()  # Perform title uniqueness check before saving
        super().save(*args, **kwargs)

    @property
    def interval_to_closed(self):
        """Calculate the time interval from posting to closing."""
        if self.date_closed:
            return (self.date_closed - self.date_posted).total_seconds() / 3600
        return None

    @property
    def time_to_refill(self):
        """Calculate the days remaining until the job expires."""
        if self.date_closed:
            return {"days": 0, "message": "Job is closed"}
        expiry_date = self.expiry_date
        days_remaining = (expiry_date - timezone.now().date()).days
        return {"days": days_remaining}

class MonthlyJobPost(models.Model):
    """Model representing monthly job posting statistics."""
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='monthly_posts')
    year = models.IntegerField(verbose_name='Year')
    month = models.IntegerField(verbose_name='Month')
    post_count = models.IntegerField(default=0, verbose_name='Post Count')

    class Meta:
        unique_together = ('job', 'year', 'month')

    def __str__(self):
        return f"{self.job.title} - {self.month}/{self.year}: {self.post_count} posts"

@receiver(post_save, sender=Job)
def increment_monthly_post(sender, instance, created, **kwargs):
    """Increment monthly post count if a job with the same title is created or reposted as active."""
    if instance.status == 'active':
        current_date = timezone.now()
        year, month = current_date.year, current_date.month

        # Check if a job with the same title exists
        existing_job = Job.objects.filter(title=instance.title, status='active').first()

        if existing_job:
            # If it exists, increment the existing job's post count
            monthly_post, _ = MonthlyJobPost.objects.get_or_create(
                job=existing_job,
                year=year,
                month=month,
                defaults={'post_count': 0}
            )
            monthly_post.post_count += 1
            monthly_post.save()
        else:
            # Otherwise, create a new MonthlyJobPost for the current job instance
            monthly_post, _ = MonthlyJobPost.objects.get_or_create(
                job=instance,
                year=year,
                month=month,
                defaults={'post_count': 1}  # Start counting from 1 since it's new
            )
            # Increment post_count if already exists
            monthly_post.post_count += 1
            monthly_post.save()

class JobViewSet:
    """Custom actions for Job ViewSet."""
    @action(detail=False, methods=['get'])
    def job_status_counts(self, request):
        """Retrieve the total count of active and expired jobs."""
        active_jobs_count = Job.objects.filter(status='active').count()
        expired_jobs_count = Job.objects.filter(status='expired').count()

        return Response({
            'active_jobs': active_jobs_count,
            'expired_jobs': expired_jobs_count
        }, status=status.HTTP_200_OK)
