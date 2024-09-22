from django.urls import path
from chat.views import Init

urlpatterns = [
    path('init', Init.as_view())
]