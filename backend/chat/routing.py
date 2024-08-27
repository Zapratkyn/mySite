from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from chat.consumers import ChatConsumer

# chat_routing = ProtocolTypeRouter({
#     'websocket': URLRouter([
#         path('ws/chat/', ChatConsumer.as_asgi()),
#     ])
# })

chat_routing = [
    # path('ws/', MainConsumer.as_asgi()),
    path("ws/chat/", ChatConsumer.as_asgi()),
]