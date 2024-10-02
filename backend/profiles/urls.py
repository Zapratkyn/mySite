from django.urls import path
from profiles.views import SignIn, SignUp, SignOut, GetProfile, SetLanguage, SetNightMode

urlpatterns = [
    path('signin', SignIn),
    path('signup', SignUp),
    path('signout', SignOut),
    path('<int:id>', GetProfile.as_view()),
    path('setLanguage', SetLanguage.as_view()),
    path('setNightMode', SetNightMode.as_view())
]