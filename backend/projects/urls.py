from django.urls import path
from projects.views import NewSuggestion, ProjectList

urlpatterns = [
    path('newSuggestion', NewSuggestion.as_view()),
    path('<str:language>', ProjectList.as_view())
]