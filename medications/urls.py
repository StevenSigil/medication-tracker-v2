from django.urls import path, re_path, include
from rest_framework import routers
from .views import MedicationView, MedicationPartialUpdateView

router = routers.DefaultRouter()
router.register('', MedicationView, basename='medication_detail')

urlpatterns = [
    re_path('update/(?P<pk>[^/.]+)/$', MedicationPartialUpdateView.as_view(), name='update_medication'),
    path('', include(router.urls), name='medication_views'),
]
