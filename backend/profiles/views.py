from django.views import View
from django.http import JsonResponse, HttpResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from profiles.models import Profile
from chat.consumers import ChatConsumer
from django.contrib.auth import authenticate, login, logout
import json

import logging

logger = logging.getLogger(__name__)

# Create your views here.

def SignIn(request):
    if not request.method == "POST":
        return JsonResponse({"error": 4}, status=405)
    try :
        if request.user.is_authenticated:
            logout(request)
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse({"error" : 2}, status=400)
        login(request, user)
        return HttpResponse()
    except: return JsonResponse({"error" : 3}, status=500)

def createUser(username, email, password):
    try:
        newUser = User.objects.create_user(username=username, password=password, email=email)
        newProfile = Profile(user=newUser, name=username)
        newProfile.save()
        return newUser
    except Exception as e: logger.debug(f"{e}")

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
        assert username != "admin"
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
        response = HttpResponse()
        response.status_code = 201
        return response
    except ValidationError:
        return JsonResponse({"error" : 1}, status=400)
    except: return JsonResponse({"error" : 8}, status=500)

def SignOut(request):
    if not request.method == "POST":
        return JsonResponse({"error": 3}, status=405)
    try:
        if not request.user.is_authenticated:
            return JsonResponse({"code" : 1}, status=400)
        if not request.user.is_superuser:
            profile = Profile.objects.get(user=request.user)
            del ChatConsumer.connected_users[profile.name]
        logout(request)
        return HttpResponse()
    except: return JsonResponse({"code" : 2}, status=500)
    
class GetProfile(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            profile = Profile.objects.get(id=id)
            if not profile:
                response.status_code = 404
                return response
            return JsonResponse({
                "id" : profile.id,
                "name" : profile.name,
                "avatar" : profile.avatar.url,
                "online" : profile.name in ChatConsumer.connected_users
            })
        except:
            response.status_code = 400
            return response
        
class SetLanguage(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or request.user.is_superuser:
                response.status_code = 403
                return response
            profile = Profile.objects.get(user=request.user)
            data = json.loads(request.body)
            language = data.get('language')
            profile.language = language
            profile.save()
            return response
        except:
            response.status_code = 400
            return response
        
class SetNightMode(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or request.user.is_superuser:
                response.status_code = 403
                return response
            profile = Profile.objects.get(user=request.user)
            profile.nightMode = not bool(profile.nightMode)
            profile.save()
            return response
        except:
            response.status_code = 400
            return response
        
class SetAvatar(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated:
                response.status_code = 403
                return response
            profile = Profile.objects.get(user=request.user)
            data = request.FILES
            avatar = data.get('avatar')
            assert avatar
            logger.debug(profile.avatar.name)
            if not profile.avatar.name == 'default-avatar.jpg':
                profile.avatar.delete()
            profile.avatar = avatar
            profile.save()
            return JsonResponse({"data" : profile.avatar.url}, status=200)
        except:
            response.status_code = 400
            return response
