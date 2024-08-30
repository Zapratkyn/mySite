from django.urls import path
from backAdmin.views import Dashboard, NewProject

urlpatterns = [
    path('', Dashboard.as_view()),
    path('newProject', NewProject.as_view())
]