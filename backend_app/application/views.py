from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from .models import Job, Application
from .serializers import ApplicationSerializer
import logging

from backend_app.settings import EMAIL_HOST_USER

logger = logging.getLogger(__name__)

def send_application_confirmation_email(to_email, job_title):
    """Send a confirmation email to the applicant after they submit their application."""
    subject = f"noreply@alphamead.com"
    message = f"Dear Applicant,\n\nThank you for applying to {job_title}. We have received your application and will review it shortly."
    from_email = EMAIL_HOST_USER
    try:
        send_mail(subject, message, from_email, [to_email])
        logger.info("Email Successfully sent.")
        print("Email Successfully sent")
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        print(f'There is an issue: {e}')

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        """Handle POST request for creating a new application."""
        logger.info("POST request received to create an application.")
        
        job = get_object_or_404(Job, pk=request.data.get('job'))
        
        # Check if the job is expired
        if job.status.lower() == 'expired':
            logger.warning(f"Attempt to apply for expired job ID {job.id}.")
            return Response({
                "detail": "This job is expired and cannot accept new applications.",
                "message": "Job is no longer active."
            }, status=status.HTTP_400_BAD_REQUEST)

        application_data = request.data.copy()
        serializer = self.get_serializer(data=application_data)
        
        if serializer.is_valid():
            application = serializer.save()
            logger.info("Application successfully submitted.")
            send_application_confirmation_email(application.email, job.title)
            return Response({
                'message': 'Application successfully created.',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """Handle PUT/PATCH request for updating an application."""
        logger.info(f"UPDATE request received for application ID {kwargs.get('pk')}.")
        response = super().update(request, *args, **kwargs)
        response.data['message'] = f"Application ID {kwargs.get('pk')} updated successfully."
        return response

    def destroy(self, request, *args, **kwargs):
        """Handle DELETE request for deleting an application."""
        logger.info(f"DELETE request received for application ID {kwargs.get('pk')}.")
        response = super().destroy(request, *args, **kwargs)
        response.data = {'message': f"Application ID {kwargs.get('pk')} successfully deleted."}
        return response

    @action(detail=True, methods=['post'], url_path='apply')
    def apply(self, request, pk=None):
        """Custom POST action for applying to a job."""
        logger.info(f"POST request received to apply for job ID {pk}.")
        
        job = get_object_or_404(Job, pk=pk)

        # Check if the job is expired
        if job.status.lower() == 'expired':
            logger.warning(f"Attempt to apply for expired job ID {pk}.")
            return Response({
                "detail": "This job is expired and cannot accept new applications.",
                "message": "Job is no longer active."
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Validation error for job ID {pk}: {serializer.errors}")
            return Response({
                "detail": "Validation error",
                "errors": serializer.errors,
                "message": "There were errors in your application form."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        application = serializer.save(job=job)
        logger.info(f"Application successfully submitted for job ID {pk}.")
        
        # Send email confirmation within try-except block
        try:
            send_application_confirmation_email(application.email, job.title)
        except Exception as e:
            logger.error(f"Error while sending email for job ID {pk}: {e}")
            return Response({
                "detail": "Email sending failed",
                "message": "Your application was submitted, but there was an issue sending the confirmation email."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            **serializer.data,
            "message": "Application successfully submitted."
        }, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        """Handle GET request for listing applications."""
        logger.info("GET request received to list all applications.")
        response = super().list(request, *args, **kwargs)
        response.data = {
            "message": "List of applications fetched successfully.",
            "applications": response.data
        }
        return response

    def retrieve(self, request, *args, **kwargs):
        """Handle GET request for retrieving a single application."""
        logger.info(f"GET request received to retrieve application ID {kwargs.get('pk')}.")
        response = super().retrieve(request, *args, **kwargs)
        response.data['message'] = f"Application ID {kwargs.get('pk')} fetched successfully."
        return response



