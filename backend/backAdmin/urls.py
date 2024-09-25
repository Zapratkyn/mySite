from django.urls import path
from backAdmin.views import Dashboard, NewArticle, EditArticle, GetArticles, NewProject, EditProject, ReadSuggestion, MarkAsRead, MakeCurrent, GetBio, EditBio

urlpatterns = [
    path('', Dashboard.as_view()),
    path('newArticle', NewArticle.as_view()),
    path('editArticle/<int:id>', EditArticle.as_view()),
    path('articles', GetArticles.as_view()),
    path('newProject', NewProject.as_view()),
    path('editProject/<int:id>', EditProject.as_view()),
    path('readSuggestion/<int:id>', ReadSuggestion.as_view()),
    path('markAsRead/<int:id>', MarkAsRead.as_view()),
    path('makeCurrent/<int:id>', MakeCurrent.as_view()),
    path('getBio', GetBio.as_view()),
    path('editBio', EditBio.as_view())
]