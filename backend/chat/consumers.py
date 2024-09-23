from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from profiles.models import Profile
from datetime import datetime
import pytz

import logging

logger = logging.getLogger(__name__)

class ChatConsumer(JsonWebsocketConsumer):

    connected_users = {}
    last_fifty_messages = []

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)
        if self.user.is_authenticated :
            if self.user.is_superuser:
                self.send_json({
                    "id" : "admin",
                    "language" : "fr"
                })
            else:
                self.profile = Profile.objects.get(user=self.user)
                ChatConsumer.connected_users[self.profile.name] = self.channel_name
                self.profile.save()
                self.send_json({
                    "id" : self.profile.id,
                    "language" : self.profile.language,
                    "onGoingSuggestion" : self.profile.onGoingSuggestion
                })
        else:
            self.send_json({"success" : "connection successful"})

    def disconnect(self, code):
        if bool(self.user.is_authenticated) and not bool(self.user.is_superuser):
            if bool(self.profile.name in ChatConsumer.connected_users):
                del ChatConsumer.connected_users[self.profile.name]
            self.profile.refresh_from_db()
            self.profile.online = False
            self.profile.save()

    def receive_json(self, content):
        if self.user.is_authenticated:
            if self.user.is_superuser:
                async_to_sync(self.channel_layer.group_send)("chat", {
                "type" : "ws.send",
                "message" : {
                    "type" : "admin",
                    "message" : content["message"]
                }
            })
            else:
                self.handle_chat(content)
                    
    def ws_send(self, event):
        self.send_json(event["message"])
                    
    def handle_chat(self, content):
        type = content["type"]
        data = {
            "type" : "ws.send",
            "message" : {
                "type" : type,
                "id" : self.profile.id,
                "name" : self.profile.name,
                "message" : content["message"]
            }
        }
        if type == "message":
            if ChatConsumer.last_fifty_messages.__len__() >= 50:
                del ChatConsumer.last_fifty_messages[0]
            ChatConsumer.last_fifty_messages.append(data["message"])
            now = datetime.now(pytz.timezone('Europe/Amsterdam'))
            logger.info('[' + datetime.strftime(now, '%d/%m/%Y, %H:%M:%S') + '] : ' + data["message"]["name"] + ' - ' + data["message"]["message"])
            async_to_sync(self.channel_layer.group_send)("chat", data)
        elif type == "whisp":
            target = content["target"]
            if not bool(Profile.objects.filter(name=target).exists()):
                    self.send_json({
                    "type" : "error",
                    "target" : target,
                    "code" : 1
                })
            else:
                if bool(target in ChatConsumer.connected_users):
                    now = datetime.now(pytz.timezone('Europe/Amsterdam'))
                    logger.info('[' + datetime.strftime(now, '%d/%m/%Y, %H:%M:%S') + '] : ' + data["message"]["name"] + ' to ' + target + ' - ' + data["message"]["message"])
                    async_to_sync(self.channel_layer.send)(ChatConsumer.connected_users[target], data)
                    self.send_json({
                        "type" : "iWhisp",
                        "target" : target,
                        "message" : content["message"]
                    })
                else:
                    self.send_json({
                        "type" : "error",
                        "target" : target,
                        "code" : 2
                    })


