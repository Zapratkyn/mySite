from django.urls import path
from chat.views import Init, GetBio, GetStats

urlpatterns = [
    path('init', Init.as_view()),
    path('getBio', GetBio.as_view()),
    path('getStats', GetStats.as_view())
]