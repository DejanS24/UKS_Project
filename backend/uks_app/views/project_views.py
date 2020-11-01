from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import ProjectSerializer
from ..models import *
import requests
import json


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@api_view(['GET'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def project(request, project_id):
    projects = Project.objects.get(id=project_id)

    serializer = ProjectSerializer(projects, many=False)
    # return JsonResponse(serializer.data, safe=False)
    return Response(serializer.data)


@api_view(['GET'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def projects(_, git_username):
    repos = requests.get('https://api.github.com/users/{0}/repos'.format(git_username))
    repos_list = json.loads(repos.text)
    owner = Account.objects.get(username=git_username)
    if owner:
        for repo in repos_list:
            print(repo)
            rep, created = Project.objects.get_or_create(
                name=repo["name"],
                description=repo["description"] or "",
                git_repo=repo["url"],
                owner=owner
            )
    return HttpResponse(repos)


@api_view(['GET'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def issues(request, git_username, project_name):
    repo = requests.get('https://api.github.com/repos/{0}/{1}/issues'.format(git_username, project_name))
    return HttpResponse(repo)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def issue(request, project_id, issue_id):
    return HttpResponse("You're inspecting this issue %s." % issue_id)


def create(request):
    Issue.objects.create(request.data)


@api_view(['GET'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def events(request, git_username, project_name, number_of_issue):
    event = requests.get('https://api.github.com/repos/{0}/{1}/issues/{2}/events'.format(git_username, project_name,number_of_issue))
    return HttpResponse(event)
