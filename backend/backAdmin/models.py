from django.db import models

# Create your models here.

class Suggestion(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=1000, default='')
    author = models.ForeignKey('profiles.Profile', related_name='suggestionAuthor', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)