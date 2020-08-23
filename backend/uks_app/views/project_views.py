from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import ProjectSerializer
from ..models import *
# import requests


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def project(request, project_id):
    projects = Project.objects.get(id=project_id)

    serializer = ProjectSerializer(projects, many=False)
    # return JsonResponse(serializer.data, safe=False)
    return Response(serializer.data)


@login_required
@api_view(['GET'])
def projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    # return JsonResponse(serializer.data, safe=False)
    return Response(serializer.data)


@login_required
@api_view(['GET'])
def issues(request, project_id):
    response = "You're looking at the issues for project %s."
    return HttpResponse(response % project_id)


@login_required
@api_view(['GET'])
def issue(request, project_id, issue_id):
    return HttpResponse("You're inspecting this issue %s." % issue_id)
