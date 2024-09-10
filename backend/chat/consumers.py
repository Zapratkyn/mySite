from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from profiles.models import Profile

import logging

logger = logging.getLogger(__name__)

class ChatConsumer(JsonWebsocketConsumer):

    connected_users = {}

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)
        if self.user.is_authenticated :
            if self.user.is_superuser:
                self.send_json({
                    "id" : "admin",
                    "language" : "fr",
                    "name" : "admin"
                })
            else:
                self.profile = Profile.objects.get(user=self.user)
                ChatConsumer.connected_users[self.profile.name] = self.channel_name
                self.profile.online = True
                self.profile.save()
                self.send_json({
                    "id" : self.profile.id,
                    "name" : self.profile.name,
                    "language" : self.profile.language,
                    "onGoingSuggestion" : self.profile.onGoingSuggestion,
                    "online" : self.profile.online
                })

    def disconnect(self, code):
        if bool(self.user.is_authenticated) and not bool(self.user.is_superuser):
            if bool(self.profile.name in ChatConsumer.connected_users):
                del ChatConsumer.connected_users[self.profile.name]
            self.profile.refresh_from_db()
            self.profile.online = False
            self.profile.save()

    def receive_json(self, content):
        action = content["action"]
        if self.user.is_authenticated:
            if action == 'login':
                ChatConsumer.connected_users[self.profile.name] = self.channel_name
            elif action == 'chat':
                self.handle_chat(content["item"])
                    
    def ws_send(self, event):
        self.send_json(event["message"])
                    
    def handle_chat(self, item):
        type = item.get("type")
        data = {
            "type" : "ws.send",
            "message" : {
                "type" : type,
                "id" : self.user.id,
                "name" : self.user.username,
                "message" : item.get("message")
            }
        }
        if type == "message":
            async_to_sync(self.channel_layer.group_send)("chat", data)
        elif type == "whisp":
            target = item.get("target")
            if not bool(Profile.objects.filter(name=target).exists()):
                    self.send_json({
                    "type" : "error",
                    "target" : target,
                    "code" : 1
                })
            else:
                if bool(target in ChatConsumer.connected_users):
                    async_to_sync(self.channel_layer.send)(ChatConsumer.connected_users[target], data)
                    self.send_json({
                        "type" : "iWhisp",
                        "target" : target,
                        "message" : item.get("message")
                    })
                else:
                    self.send_json({
                        "type" : "error",
                        "target" : target,
                        "code" : 2
                    })


