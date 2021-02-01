from django.contrib import admin
from django.urls import path, re_path, include

from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/medications/', include('medications.urls')),

    path('', index, name='index'),
    re_path('(?P<pk>[^/.]+)/$', index, name='index'),
]
