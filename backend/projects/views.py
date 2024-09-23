from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from profiles.models import Profile
from backAdmin.models import Suggestion, Article
from projects.models import Project, Comment
from projects.serializers import ProjectListSerializer, HomePageArticleSerializer, CommentSerializer
from django.utils import timezone
import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class NewSuggestion(View):
    def post(self, request):
        response = HttpResponse()
        try: 
            if not request.user.is_authenticated:
                return JsonResponse({"error" : 1}, status=403)
            profile = Profile.objects.get(user=request.user)
            if bool(profile.onGoingSuggestion):
                return JsonResponse({"error" : 2}, status=403)
            data = json.loads(request.body)
            name = data.get('title')
            desc = data.get('details')
            suggestion = Suggestion(name=name, description=desc, author=profile)
            suggestion.save()
            profile.onGoingSuggestion = True
            profile.save()
            response.status_code = 201
            return response
        except :
            response.status_code = 400
            return response
        
class ProjectList(View):
    def get(self, request):
        try:
            list = Project.objects.all().order_by('-id')
            data = []
            for item in list:
                data.append(ProjectListSerializer(item).data())
            return JsonResponse({"data" : data}, status=200)
        except:
            response = HttpResponse()
            response.status_code = 400
            return response
        
class ProjectPage(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            project = Project.objects.get(id=id)
            if not bool(project):
                response.status_code = 404
                return response
            profile = None
            if request.user.is_authenticated and not request.user.is_superuser:
                profile = Profile.objects.get(user=request.user)
            comment_list = []
            for comment in project.comments.all().order_by('id'):
                isMyComment = False
                if profile != None and comment.author != None and profile.id == comment.author.id:
                    isMyComment = True
                comment_list.append(CommentSerializer(comment).data(isMyComment))
            return JsonResponse({
                "name" : project.name,
                "desc_en" : project.description_en,
                "desc_fr" : project.description_fr,
                "link" : project.link,
                "comments" : comment_list
            }, status=200)
        except:
            response.status_code = 400
            return response

class GetCurrent(View):
    def get(self, request):
        response = HttpResponse()
        try:
            if (list(Project.objects.all()).__len__() == 0):
                response.status_code = 404
                return response
            project = Project.objects.get(isCurrent=True)
            if project:
                return JsonResponse({
                    "id" : project.id,
                    "name" : project.name
                })
        except:
            response.status_code = 400
            return response  
        
class GetArticles(View):
    def get(self, request):
        response = HttpResponse()
        try:
            articles = Article.objects.all().order_by('-id')
            list = []
            for item in articles:
                list.append(HomePageArticleSerializer(item).data())
            return JsonResponse({"list" : list}, status=200)
        except:
            response.status_code = 400
            return response
        
class NewComment(View):
    def post(self, request, id):
        response = HttpResponse()
        try: 
            if not request.user.is_authenticated:
                response.status_code = 403
                return response
            profile = Profile.objects.get(user=request.user)
            project = Project.objects.get(id=id)
            data = json.loads(request.body)
            comment = data.get('comment')
            newComment = Comment(author=profile, content=comment)
            newComment.save()
            profile.comments.add(newComment)
            profile.save()
            project.comments.add(newComment)
            project.save()
            return JsonResponse({"data" : CommentSerializer(newComment).data(True)}, status=201)
        except :
            response.status_code = 400
            return response
        
class EditComment(View):
    def post(self, request, id):
        response = HttpResponse()
        try: 
            if not request.user.is_authenticated:
                response.status_code = 403
                return response
            profile = Profile.objects.get(user=request.user)
            comment = Comment.objects.get(id=id)
            if not comment.author == profile:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            newComment = data.get('comment')
            comment.edited = True
            comment.date = timezone.now()
            comment.content = newComment
            comment.save()
            return response
        except :
            response.status_code = 400
            return response
