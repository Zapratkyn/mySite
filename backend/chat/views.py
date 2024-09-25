from django.middleware.csrf import get_token
from django.views import View
from django.http import JsonResponse, HttpResponse
from chat.consumers import ChatConsumer
from backAdmin.models import Stats
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Init(View):
    def get(self, request):
        response = JsonResponse({"data" : ChatConsumer.last_fifty_messages})
        response.set_cookie('csrftoken', get_token(request))
        return response
    
class GetBio(View):
    def get(self, request):
        response = HttpResponse()
        try:
            stats = Stats.objects.get(id=1)
            return JsonResponse({
                "bio_fr" : stats.bio_fr,
                "bio_en" : stats.bio_en
                }, status=200)
        except:
            response.status_code = 400
            return response