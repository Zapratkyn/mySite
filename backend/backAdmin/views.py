from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from projects.models import Project, Suggestion
from backAdmin.serializers import ProjectAdminListSerializer, SuggestionAdminListSerializer
import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Dashboard(View):
    def get(self, request):
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response = HttpResponse()
                response.status_code = 400
                return response
            else:
                projects = Project.objects.all()
                suggestions = Suggestion.objects.all()
                projectList = []
                for item in projects:
                    projectList.append(ProjectAdminListSerializer(item).data())
                suggList = []
                for item in suggestions:
                    suggList.append(SuggestionAdminListSerializer(item).data())
                data = {
                    "projects" : projectList,
                    "suggestions" : suggList
                }
                return JsonResponse(data, status=200)
        except: return JsonResponse({"error" : 1}, status=400)

class NewProject(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('title')
            link = data.get('link')
            desc_fr = data.get('desc_fr')
            desc_en = data.get('desc_en')
            project = Project(name=name, link=link, description_fr=desc_fr, description_en=desc_en)
            project.save()
            return JsonResponse({"id" : project.id}, status=201)
        except:
            response = HttpResponse()
            response.status_code = 400
            return response