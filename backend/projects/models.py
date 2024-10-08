from django.db import models
from datetime import datetime
from django.utils import timezone
import pytz

# Create your models here.

class Comment(models.Model):
    author = models.ForeignKey('profiles.Profile', related_name='messageAuthor', null=True, on_delete=models.RESTRICT)
    date = models.DateTimeField(default=timezone.now)
    content = models.CharField(default='', max_length=1000)
    read = models.BooleanField(default=False)
    edited = models.BooleanField(default=False)
    responses = models.ManyToManyField('self')
    isResponse = models.BooleanField(default=False)

class Project(models.Model):
    name = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(default=timezone.now)
    comments_read = models.IntegerField(default=0)
    description_en = models.CharField(max_length=1000, default='')
    description_fr = models.CharField(max_length=1000, default='')
    link = models.CharField(max_length=200, default='')
    # integration = models.BooleanField(default=False)
    contrib = models.ManyToManyField("profiles.Profile", related_name='contributors')
    # completion = models.IntegerField(default=0)
    comments = models.ManyToManyField('projects.Comment', related_name='comments')
    isCurrent = models.BooleanField(default=False)


