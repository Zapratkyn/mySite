from django.urls import path
from profiles.views import SignIn, SignUp, SignOut, GetProfile, GetCookie

urlpatterns = [
    path('signin', SignIn),
    path('signup', SignUp),
    path('signout', SignOut),
    path('<int:id>', GetProfile.as_view()),
    path('getCookie', GetCookie.as_view())
]