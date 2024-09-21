from django.db import models
from django.contrib.auth.models import User 

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, default='')
    onGoingSuggestion = models.BooleanField(default=False)
    # avatar = models.ImageField(default=None, blank=True)
    language = models.CharField(max_length=2, default='en')
    # NbOfMessages = models.IntegerField(default=0)
    messages = models.ManyToManyField('projects.Message', related_name='messages')
    # contributions = models.ManyToManyField('projects.Project', related_name='contrib')
    # suggestions = models.ManyToManyField('projects.Suggestion', related_name='suggestions')

