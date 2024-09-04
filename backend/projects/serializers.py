from django.utils.dateparse import parse_datetime
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ProjectListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self, language):
        # logger.debug(language)
        desc = self.instance.description_en
        if language == 'fr':
            desc = self.instance.description_fr
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "creation_date" : datetime.strftime(self.instance.creation_date, '%d/%m/%Y'),
            "desc" : desc,
            "languages" : self.instance.languages
        }