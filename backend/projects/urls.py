from django.urls import path
from projects.views import Test

urlpatterns = [
    path('', Test.as_view())
]