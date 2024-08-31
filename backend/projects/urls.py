from django.urls import path
from projects.views import NewSuggestion

urlpatterns = [
    path('newSuggestion', NewSuggestion.as_view())
]