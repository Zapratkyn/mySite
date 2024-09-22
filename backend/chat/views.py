from django.middleware.csrf import get_token
from django.views import View
from django.http import JsonResponse
from chat.consumers import ChatConsumer

# Create your views here.

class Init(View):
    def get(self, request):
        messages = []
        for message in ChatConsumer.last_fifty_messages:
            messages.append(message)
        response = JsonResponse({"data" : messages})
        csrf_token = get_token(request)
        response.set_cookie('csrftoken', csrf_token)
        return response