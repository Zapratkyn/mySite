from django.urls import path
from backAdmin.views import Dashboard, NewProject, EditProject, ReadSuggestion, MarkAsRead

urlpatterns = [
    path('', Dashboard.as_view()),
    path('newProject', NewProject.as_view()),
    path('editProject/<int:id>', EditProject.as_view()),
    path('readSuggestion/<int:id>', ReadSuggestion.as_view()),
    path('markAsRead/<int:id>', MarkAsRead.as_view())
]