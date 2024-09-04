from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from profiles.models import Profile
from backAdmin.models import Suggestion
from projects.models import Project
from projects.serializers import ProjectListSerializer
import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class NewSuggestion(View):
    def post(self, request):
        response = HttpResponse()
        try: 
            if not request.user.is_authenticated:
                return JsonResponse({"error" : 1}, status=403)
            profile = Profile.objects.get(user=request.user)
            if bool(profile.onGoingSuggestion):
                return JsonResponse({"error" : 2}, status=403)
            data = json.loads(request.body)
            name = data.get('title')
            desc = data.get('details')
            suggestion = Suggestion(name=name, description=desc, author=profile)
            suggestion.save()
            profile.onGoingSuggestion = True
            profile.save()
            response.status_code = 201
            return response
        except :
            response.status_code = 400
            return response
        
class ProjectList(View):
    def get(self, request):
        try:
            list = Project.objects.all().order_by('-id')
            data = []
            for item in list:
                data.append(ProjectListSerializer(item).data())
            return JsonResponse({"data" : data}, status=200)
        except:
            response = HttpResponse()
            response.status_code = 400
            return response
        
class ProjectPage(View):
    def get(self, request, id):
        try:
            logger.debug('DEBUG')
            project = Project.objects.get(id=id)
            logger.debug(project)
            return JsonResponse({
                "name" : project.name,
                "desc_en" : project.description_en,
                "desc_fr" : project.description_fr,
                "link" : project.link
            }, status=200)
        except:
            response = HttpResponse()
            response.status_code = 400
            return response
