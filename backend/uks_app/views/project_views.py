from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import *
from ..models import *
import requests
import json


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def project(request, project_id):
    projects = Project.objects.get(id=project_id)

    serializer = ProjectSerializer(projects, many=False)
    # return JsonResponse(serializer.data, safe=False)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def projects(_, git_username):
    repos = requests.get('https://api.github.com/users/{0}/repos'.format(git_username))
    repos_list = json.loads(repos.text)
    # repos = []
    try:
        owner = Account.objects.get(username=git_username)
    except Account.DoesNotExist:
        owner = None
    if owner:
        for repo in repos_list:
        # for repo in []:
            print(repo)
            rep, created = Project.objects.get_or_create(
                name=repo["name"],
                description=repo["description"] or "",
                git_repo=repo["url"],
                owner=owner
            )
    return HttpResponse(repos)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def issues(request, git_username, project_name):

    acc = Account.objects.get(user=request.user)
    # issues = Issue.objects.get(git_username=acc.username, project)
    repo = requests.get('https://api.github.com/repos/{0}/{1}/issues'.format(git_username, project_name))
    # return HttpResponse(repo)

    return JsonResponse({"remote": repo, "local": [IssueSerializer(Issue.objects.get(id=1)).data]})
    # return HttpResponse({})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def issue(request, project_id, issue_id):
    return HttpResponse("You're inspecting this issue %s." % issue_id)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_issue(request):
    print(request.data)
    label = Label.objects.get(id=request.data["label_id"])
    project = Project.objects.get(name=request.data["project_name"])
    issue = Issue.objects.create(title=request.data["title"],
                                 project_id=project.id,
                                 state=IssueState(request.data["state"]))
    issue.labels.set([label])
    issue.save()
    # Issue.objects.create(request.data)
    return HttpResponse("Success")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_labels(_):
    labels = Label.objects.all()
    serializer = LabelSerializer(labels, many=True)

    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_label(request):
    Label.objects.create(name=request.data["name"],
                         color=request.data["color"])
    return HttpResponse("Success")


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def events(request, git_username, project_name, number_of_issue):
    event = requests.get('https://api.github.com/repos/{0}/{1}/issues/{2}/events'.format(git_username, project_name,number_of_issue))
    return HttpResponse(event)
