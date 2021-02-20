from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from django.views.decorators.csrf import csrf_exempt

from ..models import User, Account
from pprint import pprint
from django.http.response import JsonResponse
from django.core import serializers
from ..serializers import *

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    user = authenticate(username=request.data["username"],
                        password=request.data["password"])
    print(user)
    owner = Account.objects.get(user=user)
    User.git_hub_username = property(lambda self: owner.username)
    pprint(vars(user))
    print(user.git_hub_username)
    if user is None:
        return HttpResponse("Username not found", status=404)
    # login(request, user)
    token = Token.objects.get(user=user)
    return JsonResponse({"token": TokenSerializer(token).data['key'], "owner": owner.username})


@csrf_exempt
@api_view(['POST'])
def register_user(request):
    user = User(username=request.data['username'],
                email=request.data['email'])
    user.set_password(request.data['password'])
    user.save()
    token = Token(user=user)
    token.save()
    account = Account(username=request.data['git_username'],
                      email=request.data['email'],
                      user=user)
    account.save()
    

    return Response(request.data)
