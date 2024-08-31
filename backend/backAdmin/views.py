from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from projects.models import Project
from backAdmin.models import Suggestion
from backAdmin.serializers import ProjectAdminListSerializer, SuggestionAdminListSerializer, ProjectEditionSerializer
import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Dashboard(View):
    def get(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            else:
                projects = Project.objects.all().order_by('-id')
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
        except:
            response.status_code = 400
            return response

class NewProject(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            name = data.get('title')
            link = data.get('link')
            desc_fr = data.get('desc_fr')
            desc_en = data.get('desc_en')
            project = Project(name=name, link=link, description_fr=desc_fr, description_en=desc_en)
            project.save()
            return JsonResponse({"id" : project.id}, status=201)
        except:
            response.status_code = 400
            return response
        
class EditProject(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            project = Project.objects.get(id=id)
            return JsonResponse(ProjectEditionSerializer(project).data(), status=200)
        except:
            response.status_code = 400
            return response
        
    def post(self, request, id):
        response = HttpResponse()
        try:
            logger.debug('HERE')
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            name = data.get('title')
            link = data.get('link')
            desc_fr = data.get('desc_fr')
            desc_en = data.get('desc_en')
            project = Project.objects.get(id=id)
            project.name = name
            project.link = link
            project.description_fr = desc_fr
            project.description_en = desc_en
            project.save()
            return JsonResponse({"id" : project.id}, status=200)
        except:
            response.status_code = 400
            return response
    
    def delete(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            project = Project.objects.get(id=id)
            project.delete()
            return response
        except:
            response.status_code = 400
            return response
        