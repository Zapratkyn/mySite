from django.urls import path
from projects.views import NewSuggestion, ProjectList, ProjectPage, GetCurrent, GetArticles, NewComment, EditComment, NewResponse

urlpatterns = [
    path('newSuggestion', NewSuggestion.as_view()),
    path('', ProjectList.as_view()),
    path('<int:id>', ProjectPage.as_view()),
    path('getCurrent', GetCurrent.as_view()),
    path('articles', GetArticles.as_view()),
    path('<int:id>/newComment', NewComment.as_view()),
    path('editComment/<int:id>', EditComment.as_view()),
    path('sendResponse/<int:id>', NewResponse.as_view())
]