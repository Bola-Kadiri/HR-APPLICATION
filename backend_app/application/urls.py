from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
    path('applications/<uuid:job_id>/apply/', ApplicationViewSet.as_view({'post': 'create'}), name='apply_to_job'),  # Ensure correct view is used
]

