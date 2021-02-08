from django.urls import path, re_path, include
from rest_framework import routers

from .views import MedicationView, MedicationPartialUpdateView, MedicationSearchView

router = routers.DefaultRouter()
router.register('', MedicationView, basename='medication_detail')

urlpatterns = [
    re_path('update/(?P<pk>[^/.]+)/$', MedicationPartialUpdateView.as_view(), name='update_medication'),
    path('search/', MedicationSearchView.as_view(), name='medication_search'),
    path('', include(router.urls), name='medication_views'),
]
