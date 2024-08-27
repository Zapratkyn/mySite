from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Test(View):
    def get(self, request):
        logger.debug('Salut')
        return JsonResponse({"message" : request.user.username}, status=205)