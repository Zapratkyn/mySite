from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

# Create your views here.

class Test(View):
    def get(self, request):
        try : return JsonResponse({"message" : "Bazinga !"}, status=200)
        except Exception as e : return JsonResponse(f"{e}", status=404, safe=False)
