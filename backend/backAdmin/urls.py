from django.urls import path
from backAdmin.views import Dashboard

urlpatterns = [
    path('', Dashboard.as_view())
]