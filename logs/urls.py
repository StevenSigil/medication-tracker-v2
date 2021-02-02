from django.urls import path, re_path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('', views.LogViewSet, basename='log_views')

urlpatterns = [
    path('', include(router.urls)),
]
