from datetime import datetime
from django.utils.timezone import localtime
import pytz
import logging

logger = logging.getLogger(__name__)

class ProjectListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "creation_date" : datetime.strftime(pytz.timezone(self.instance.creation_date, "Europe/Amsterdam"), '%d/%m/%Y'),
            "desc_en" : self.instance.description_en,
            "desc_fr" : self.instance.description_fr
        }
    
class HomePageArticleSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "title" : self.instance.title,
            "creation_date" : datetime.strftime(localtime(self.instance.date), '%d/%m/%Y'),
            "content_fr" : self.instance.content_fr,
            "content_en" : self.instance.content_en
        }
    
class CommentSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self, isMyComment):
        return {
            "author" : {
                "id" : self.instance.author.id,
                "name" : self.instance.author.name,
                "avatar" : "/images/default-avatar.jpg"
            },
            "id" : self.instance.id,
            "date" : datetime.strftime(localtime(self.instance.date), '%d/%m/%Y, %H:%M:%S'),
            "content" : self.instance.content,
            "isMyComment" : isMyComment,
            "edited" : self.instance.edited
        }
