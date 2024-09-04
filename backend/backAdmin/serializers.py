from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ArticleAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "title" : self.instance.title
        }
    
class ArticleEditionSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "title" : self.instance.title,
            "content_fr" : self.instance.content_fr,
            "content_en" : self.instance.content_en
        }

class ProjectAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        newMessage = False
        if self.instance.comments.count() > self.instance.comments_read:
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
            "authorId" : self.instance.author.id,
            "archived" : self.instance.archived
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
    
class HomePageArticleSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "title" : self.instance.title,
            "creation_date" : datetime.strftime(self.instance.creation_date, '%d/%m/%Y'),
            "content_fr" : self.instance.content_fr,
            "content_en" : self.instance.content_en
        }