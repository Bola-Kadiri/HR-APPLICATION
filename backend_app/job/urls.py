from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Set up a router for the JobViewSet
router = DefaultRouter()
router.register(r'', views.JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),  # Connects all JobViewSet actions
]
