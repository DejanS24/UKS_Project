from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from django.views.decorators.csrf import csrf_exempt

from ..models import User, Account


@csrf_exempt
@api_view(['POST'])
def login_user(request):
    user = authenticate(username=request.data["username"],
                        password=request.data["password"])
    if user is None:
        return HttpResponse("Username not found", status=404)
    # login(request, user)
    token = Token.objects.get(user=user)
    return HttpResponse(token)


@csrf_exempt
@api_view(['POST'])
def register_user(request):
    user = User(username=request.data['username'],
                password=request.data['password'],
                email=request.data['email'])
    user.save()
    token = Token(user=user)
    token.save()
    account = Account(username=request.data['git_username'],
                      email=request.data['email'],
                      user=user)
    account.save()

    return Response(request.data)
