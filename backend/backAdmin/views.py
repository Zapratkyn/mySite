from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from projects.models import Project, Suggestion
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
                data = {
                    "projects" : list(Project.objects.all()),
                    "suggestions" : list(Suggestion.objects.all())
                }
                return JsonResponse(data, status=200)
        except: return JsonResponse({"error" : 1}, status=400)