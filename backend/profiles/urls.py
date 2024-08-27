from django.urls import path
from profiles.views import SignIn, SignUp, SignOut

urlpatterns = [
    path('signin', SignIn),
    path('signup', SignUp),
    path('signout', SignOut)
]