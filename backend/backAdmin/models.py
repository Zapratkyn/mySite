from django.db import models
from datetime import datetime
from django.utils import timezone
import pytz

# Create your models here.

class Suggestion(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=1000, default='')
    author = models.ForeignKey('profiles.Profile', related_name='suggestionAuthor', on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)

class Article(models.Model):
    title = models.CharField(max_length=50, default='')
    date = models.DateTimeField(default=timezone.now)
    content_en = models.CharField(max_length=1000, default='')
    content_fr = models.CharField(max_length=1000, default='')
    edited = models.BooleanField(default=False)

class Stats(models.Model):
    visits = models.IntegerField(default=0)
    bio_fr = models.CharField(max_length=10000, default='')
    bio_en = models.CharField(max_length=10000, default='')