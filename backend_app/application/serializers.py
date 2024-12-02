from rest_framework import serializers
from .models import Application, Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description']  # Add any other fields you want to include

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)  # Include job details in the application serializer

    class Meta:
        model = Application
        fields = ['id', 'job', 'email', 'first_name', 'last_name', 'cv', 'cover_letter', 'application_date', 'filter_score']
        read_only_fields = ['application_date']  # Exclude filter_score from read_only to allow updates

    def validate_filter_score(self, value):
        """Ensure that the filter_score is valid (i.e., between 0 and 10)."""
        if value < 0 or value > 10:
            raise serializers.ValidationError("Filter score must be between 0 and 10.")
        return value


