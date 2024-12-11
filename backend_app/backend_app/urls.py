from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin route
    path('applications/', include('application.urls')),  # Include the app routes
    path('job/', include('job.urls')),  # Include job-related URLs
   path('', include('user_authentication.urls')),  # Include job-related URLs
]

