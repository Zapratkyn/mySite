from django.urls import path
from backAdmin.views import Dashboard, NewProject, EditProject

urlpatterns = [
    path('', Dashboard.as_view()),
    path('newProject', NewProject.as_view()),
    path('editProject/<int:id>', EditProject.as_view())
]