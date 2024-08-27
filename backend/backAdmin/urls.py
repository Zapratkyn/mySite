from django.urls import path
from backAdmin.views import Test

urlpatterns = [
    path('', Test.as_view())
]