from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Test(View):
    def get(self, request):
        try:
            if not request.user.username == 'pouet':
                response = HttpResponse()
                response.status_code = 400
                return response
            else:
                return HttpResponse()
        except: return JsonResponse({"error" : 1}, status=400)