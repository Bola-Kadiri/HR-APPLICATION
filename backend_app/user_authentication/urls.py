from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
  
    path('auth/', include('djoser.urls')),  # Djoser authentication URLs
    path('auth/', include('djoser.urls.jwt')),  # JWT authentication URLs
]

