from django.urls import path
from projects.views import NewSuggestion, ProjectList, ProjectPage

urlpatterns = [
    path('newSuggestion', NewSuggestion.as_view()),
    path('', ProjectList.as_view()),
    path('<int:id>', ProjectPage.as_view())
]