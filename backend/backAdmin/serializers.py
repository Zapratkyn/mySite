class ProjectAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "newMessage" : False
        }
    
class SuggestionAdminListSerializer:
    def __init__(self, instance):
        self.instance = instance

    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.name,
            "author" : self.instance.author
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