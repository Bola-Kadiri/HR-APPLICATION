from datetime import timezone
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Job, MonthlyJobPost
from .serializers import JobSerializer
from django.db.models import Sum
from rest_framework.exceptions import ValidationError



class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    lookup_field = 'id'
   

    @action(detail=False, methods=['get'])
    def monthly_post_percentage(self, request):
        """Retrieve monthly job post counts and calculate percentages."""
        current_year = timezone.now().year
        monthly_data = MonthlyJobPost.objects.filter(year=current_year).values('month').annotate(
            total_posts=Sum('post_count')
        )

        total_posts = sum([data['total_posts'] for data in monthly_data])
        if total_posts == 0:
            return Response({"message": "No job posts available for the current year."}, status=status.HTTP_200_OK)

        data_with_percentage = [
            {
                'month': data['month'],
                'post_count': data['total_posts'],
                'percentage': round((data['total_posts'] / total_posts) * 100, 2)
            }
            for data in monthly_data
        ]

        return Response(data_with_percentage, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Create a new job, ensuring the title is unique."""
        title = request.data.get('title')

        # Check if a job with the same title already exists
        if Job.objects.filter(title=title).exists():
            raise ValidationError("A job with this title already exists.")

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({
                'message': 'Job created successfully.',
                'job': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """Update an existing job, ensuring the title remains unique."""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if 'title' in request.data:  # Only validate if the title is being updated
            self.validate_unique_title(request.data['title'], instance)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                'message': 'Job updated successfully.',
                'job': serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """Delete an existing job."""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'message': 'Job deleted successfully.'
        }, status=status.HTTP_204_NO_CONTENT)

    def validate_unique_title(self, title, instance=None):
        """Check for the uniqueness of the job title, excluding the current instance."""
        if instance:
            if Job.objects.exclude(id=instance.id).filter(title=title).exists():
                raise ValidationError("A job with this title already exists.")
        else:
            if Job.objects.filter(title=title).exists():
                raise ValidationError("A job with this title already exists.")

    @action(detail=True, methods=['get'])
    def monthly_post_data(self, request, id=None):
        """Retrieve monthly post count for a specific job."""
        job = self.get_object()
        monthly_data = MonthlyJobPost.objects.filter(job=job).values('year', 'month').annotate(total_posts=Sum('post_count'))
        
        # If no data found, return a message
        if not monthly_data:
            return Response({"message": "No monthly post data available for this job."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(monthly_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def yearly_post_data(self, request, id=None):
        """Retrieve yearly post count for a specific job."""
        job = self.get_object()
        yearly_data = MonthlyJobPost.objects.filter(job=job).values('year').annotate(total_posts=Sum('post_count'))
        
        # If no data found, return a message
        if not yearly_data:
            return Response({"message": "No yearly post data available for this job."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(yearly_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def posting_details(self, request, id=None):
        """Retrieve job details with posting and closing times."""
        job = self.get_object()
        posting_info = {
            'title': job.title,
            'date_posted': job.date_posted,
            'date_closed': job.date_closed,
            'time_to_refill': job.time_to_refill
        }
        return Response(posting_info, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def job_status_counts(self, request):
        """Retrieve the total count of active and expired jobs."""
        active_jobs_count = Job.objects.filter(status='active').count()
        expired_jobs_count = Job.objects.filter(status='expired').count()

        return Response({
            'active_jobs': active_jobs_count,
            'expired_jobs': expired_jobs_count
        }, status=status.HTTP_200_OK)

