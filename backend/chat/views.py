from django.middleware.csrf import get_token
from django.views import View
from django.http import JsonResponse
from chat.consumers import ChatConsumer

# Create your views here.

class Init(View):
    def get(self, request):
        response = JsonResponse({"data" : ChatConsumer.last_fifty_messages})
        response.set_cookie('csrftoken', get_token(request))
        return response