from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('', views.BPLogView, basename='blood_pressure_log')

urlpatterns = [
    path('', include(router.urls)),
]
