from django.urls import path
from projects.views import NewSuggestion, ProjectList, ProjectPage, GetCurrent, GetArticles, NewComment

urlpatterns = [
    path('newSuggestion', NewSuggestion.as_view()),
    path('', ProjectList.as_view()),
    path('<int:id>', ProjectPage.as_view()),
    path('getCurrent', GetCurrent.as_view()),
    path('articles', GetArticles.as_view()),
    path('<int:id>/newComment', NewComment.as_view()),
]