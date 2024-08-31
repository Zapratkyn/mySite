import logging

logger = logging.getLogger(__name__)

class ProjectAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        newMessage = False
        if self.instance.messages.count() > self.instance.messages_read:
            newMessage = True
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "newMessage" : newMessage
        }
    
class SuggestionAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "author" : self.instance.author.name,
            "authorId" : self.instance.author.id
        }
    
class ProjectEditionSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "name" : self.instance.name,
            "desc_fr" : self.instance.description_fr,
            "desc_en" : self.instance.description_en,
            "link" : self.instance.link
        }