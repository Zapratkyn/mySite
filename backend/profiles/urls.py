from django.urls import path
from profiles.views import Test, SignIn, SignUp, SignOut

urlpatterns = [
    path('', Test.as_view()),
    path('signin', SignIn),
    path('signup', SignUp),
    path('signout', SignOut)
]