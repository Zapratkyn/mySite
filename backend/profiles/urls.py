from django.urls import path
from profiles.views import Test

urlpatterns = [
    path('', Test.as_view())
]