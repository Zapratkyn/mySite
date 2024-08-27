from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from profiles.models import Profile
from django.contrib.auth.models import User

import logging

logger = logging.getLogger(__name__)

class ChatConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        if self.user.is_authenticated :
            if self.user.username == 'shukk':
                self.send_json({
                    "id" : "admin",
                    "language" : "fr"
                })
            else:
                self.profile = Profile.objects.get(user=self.user)
                self.profile.online = True
                self.profile.chatChannelName = self.channel_name
                self.profile.save()
                data = {
                    "id" : self.user.id,
                    "name" : self.profile.name,
                    "language" : self.profile.language
                }
                self.send_json(data)

    def disconnect(self, code):
        if not bool(self.user.username == 'shukk'):
            self.profile.refresh_from_db()
            self.profile.chatChannelName = None
            self.profile.online = False
            self.profile.save()

    def receive_json(self, content):
        action = content["action"]
        if self.user.is_authenticated:
            if action == 'login':
                self.profile.online = True
                self.profile.chatChannelName = self.channel_name
                self.profile.save()

