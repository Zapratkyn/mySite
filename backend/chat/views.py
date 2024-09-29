from django.middleware.csrf import get_token
from django.views import View
from django.http import JsonResponse, HttpResponse
from chat.consumers import ChatConsumer
from backAdmin.models import Stats
from profiles.models import Profile
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Init(View):
    def get(self, request):
        ChatConsumer.visits += 1
        response = JsonResponse({
            "messages" : ChatConsumer.last_fifty_messages,
            "visits" : ChatConsumer.visits,
            "users" : Profile.objects.all().count()
        })
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
        
class GetStats(View):
    def get(self, request):
        response = HttpResponse()
        try:
            visits = ChatConsumer.visits
            users = Profile.objects.all().count()
            return JsonResponse({
                "visits" : visits,
                "users" : users
            })
        except:
            response.status_code = 400
            return response