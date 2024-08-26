import json
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from profiles.models import Profile
from profiles.serializers import MyProfileSerializer

class ChatConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        if self.user.is_authenticated :
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

    def disconnect(self):
        self.profile.refresh_from_db()
        self.profile.online = False
        self.profile.chatChannelName = None
        self.profile.save()

    def receive_json(self, content):
        action = content["action"]
        if self.user.is_authenticated:
            if action == 'signin' or action == 'signup':
                self.profile.chatChannelName = self.channel_name
                self.profile.save()

