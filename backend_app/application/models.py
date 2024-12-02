import uuid
from django.db import models
from job.models import Job

class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cv = models.FileField(upload_to='cvs/')
    cover_letter = models.FileField(upload_to='cover_letters/')  # Cover letter as a file upload
    application_date = models.DateTimeField(auto_now_add=True)
    filter_score = models.FloatField(null=True, blank=True)  # Field to store filter score based on matching

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.job.title}"



