from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(default=timezone.now)
    comments_read = models.IntegerField(default=0)
    image = models.ImageField(default='', null=True)
    description_en = models.CharField(max_length=1000, default='')
    description_fr = models.CharField(max_length=1000, default='')
    languages = ArrayField(models.CharField(max_length=10, default=''), default=list)
    link = models.CharField(max_length=200, default='')
    integration = models.BooleanField(default=False)
    contrib = models.ManyToManyField("profiles.Profile", related_name='contributors')
    # completion = models.IntegerField(default=0)
    comments = models.ManyToManyField('Message', related_name='comments')
    isCurrent = models.BooleanField(default=False)

class Message(models.Model):
    author = models.ForeignKey('profiles.Profile', related_name='messageAuthor', on_delete=models.CASCADE)
    authorId = models.IntegerField(default=0)
    content = models.CharField(default='')
    read = models.BooleanField(default=False)
