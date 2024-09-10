from django.utils.dateparse import parse_datetime
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ProjectListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "creation_date" : datetime.strftime(self.instance.creation_date, '%d/%m/%Y'),
            "desc_en" : self.instance.description_en,
            "desc_fr" : self.instance.description_fr,
            "languages" : self.instance.languages
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