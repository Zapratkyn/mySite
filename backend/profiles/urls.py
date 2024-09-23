from django.urls import path
from profiles.views import SignIn, SignUp, SignOut, GetProfile

urlpatterns = [
    path('signin', SignIn),
    path('signup', SignUp),
    path('signout', SignOut),
    path('<int:id>', GetProfile.as_view())
]