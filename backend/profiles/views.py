from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from profiles.models import Profile
from django.contrib.auth import authenticate, login, logout
import json

# Create your views here.

class Test(View):
    def get(self, request):
        try : 
            response = HttpResponse("Salut")
            # response.content("Salut")
            return response
        except Exception as e : return JsonResponse(f"{e}", status=404, safe=False)

@csrf_exempt
def SignIn(request):
    if not request.method == "POST":
        return JsonResponse({"error": 4}, status=405)
    try :
        if request.user.is_authenticated:
            return JsonResponse({"error" : 1}, status=400)
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse({"error" : 2}, status=400)
        login(request, user)
        profile = Profile.objects.get(user=request.user)
        return JsonResponse({
            "id" : profile.id,
            "name" : profile.name,
            "language" : profile.language
        }, status=200)
    except: return JsonResponse({"error" : 3}, status=500)

def createUser(username, email, password):
    try:
        newUser = User.objects.create_user(username=username, password=password, email=email)
        newProfile = Profile(user=newUser, name=username)
        newProfile.save()
        return newUser
    except Exception as e : return None

@csrf_exempt
def SignUp(request):
    if not request.method == "POST":
        return JsonResponse({"error": 9}, status=405)
    try :
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        validate_email(email)
        password = data.get('password')
        passwordConfirm = data.get('passwordConfirm')
        if username == '' or password == '':
            return JsonResponse({"error": 5}, status=400)
        if password != passwordConfirm:
            return JsonResponse({"error": 2}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": 3}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": 4}, status=400)
        newUser = createUser(username=username, email=email, password=password)
        if newUser is None:
            return JsonResponse({"error" : 6}, status=500)
        user = authenticate(username=username, password=password)
        if user is None:
            return JsonResponse({"error" : 7}, status=500)
        login(request=request, user=user)
        profile = Profile.objects.get(user=newUser)
        return JsonResponse({
            "id" : profile.id,
            "name" : profile.name,
            "language" : profile.language
        }, status=201)
    except ValidationError:
        return JsonResponse({"error" : 1}, status=400)
    except: return JsonResponse({"error" : 8}, status=500)

@csrf_exempt
def SignOut(request):
    if not request.method == "POST":
        return JsonResponse({"error": 3}, status=405)
    try:
        if not request.user.is_authenticated:
            return JsonResponse({"code" : 1}, status=400)
        logout(request)
        return HttpResponse()
    except: return JsonResponse({"code" : 2}, status=500)
    
