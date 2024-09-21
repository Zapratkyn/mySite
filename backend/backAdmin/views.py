from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from projects.models import Project
from backAdmin.models import Suggestion, Article
from backAdmin.serializers import ProjectAdminListSerializer, SuggestionAdminListSerializer, ProjectEditionSerializer, ArticleAdminListSerializer, ArticleEditionSerializer, HomePageArticleSerializer
import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class Dashboard(View):
    def get(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            else:
                articles = Article.objects.all().order_by('-id')
                projects = Project.objects.all().order_by('-id')
                suggestions = Suggestion.objects.all().order_by('-id')
                articleList = []
                for item in articles:
                    articleList.append(ArticleAdminListSerializer(item).data())
                projectList = []
                for item in projects:
                    projectList.append(ProjectAdminListSerializer(item).data())
                suggList = []
                for item in suggestions:
                    suggList.append(SuggestionAdminListSerializer(item).data())
                data = {
                    "articles" : articleList,
                    "projects" : projectList,
                    "suggestions" : suggList
                }
                return JsonResponse(data, status=200)
        except:
            response.status_code = 400
            return response
        
class NewArticle(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            title = data.get('title')
            content_fr = data.get('content_fr')
            content_en = data.get('content_en')
            article = Article(title=title, content_fr=content_fr, content_en=content_en)
            article.save()
            return JsonResponse({"id" : article.id}, status=201)
        except:
            response.status_code = 400
            return response
        
class EditArticle(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            article = Article.objects.get(id=id)
            return JsonResponse(ArticleEditionSerializer(article).data(), status=200)
        except:
            response.status_code = 400
            return response
        
    def post(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            title = data.get('title')
            content_fr = data.get('content_fr')
            content_en = data.get('content_en')
            article = Article.objects.get(id=id)
            article.title = title
            article.content_fr = content_fr
            article.content_en = content_en
            article.save()
            return JsonResponse({"id" : article.id}, status=200)
        except:
            response.status_code = 400
            return response
    
    def delete(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            article = Article.objects.get(id=id)
            article.delete()
            return response
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

class NewProject(View):
    def post(self, request):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            name = data.get('title')
            link = data.get('link')
            desc_fr = data.get('desc_fr')
            desc_en = data.get('desc_en')
            project = Project(name=name, link=link, description_fr=desc_fr, description_en=desc_en)
            if list(Project.objects.all()).__len__() == 0:
                project.isCurrent = True
            project.save()
            return JsonResponse({"id" : project.id}, status=201)
        except:
            response.status_code = 400
            return response
        
class EditProject(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            project = Project.objects.get(id=id)
            return JsonResponse(ProjectEditionSerializer(project).data(), status=200)
        except:
            response.status_code = 400
            return response
        
    def post(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            data = json.loads(request.body)
            name = data.get('title')
            link = data.get('link')
            desc_fr = data.get('desc_fr')
            desc_en = data.get('desc_en')
            project = Project.objects.get(id=id)
            project.name = name
            project.link = link
            project.description_fr = desc_fr
            project.description_en = desc_en
            project.save()
            return JsonResponse({"id" : project.id}, status=200)
        except:
            response.status_code = 400
            return response
    
    def delete(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            project = Project.objects.get(id=id)
            project.delete()
            return response
        except:
            response.status_code = 400
            return response
        
class ReadSuggestion(View):
    def get(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            suggestion = Suggestion.objects.get(id=id)
            return JsonResponse({
                "title" : suggestion.name,
                "content" : suggestion.description,
                "author" : suggestion.author.name,
                "authorId" : suggestion.author.id
            })
        except:
            response.status_code = 400
            return response

class MarkAsRead(View):
    def post(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            suggestion = Suggestion.objects.get(id=id)
            suggestion.author.onGoingSuggestion = False
            suggestion.author.save()
            suggestion.archived = True
            suggestion.save()
            return response
        except:
            response.status_code = 400
            return response

class MakeCurrent(View):
    def post(self, request, id):
        response = HttpResponse()
        try:
            if not request.user.is_authenticated or not request.user.is_superuser:
                response.status_code = 403
                return response
            project = Project.objects.get(isCurrent=True)
            if project:
                project.isCurrent = False
                project.save()
            project = Project.objects.get(id=id)
            if project:
                project.isCurrent = True
                project.save()
            return response
        except:
            response.status_code = 400
            return response
      
