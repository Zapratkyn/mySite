from django.db import models
from django.contrib.auth.models import User 

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, default='')
    onGoingSuggestion = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default-avatar.jpg', null=True)
    language = models.CharField(max_length=2, default='en')
    nightMode = models.BooleanField(default=False)
    # NbOfMessages = models.IntegerField(default=0)
    comments = models.ManyToManyField('projects.Comment', related_name='messages')
    # contributions = models.ManyToManyField('projects.Project', related_name='contrib')
    # suggestions = models.ManyToManyField('projects.Suggestion', related_name='suggestions')

