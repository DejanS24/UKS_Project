from django.urls import path

from .views.project_views import *
from .views.user_views import *

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_user, name='login'),
    path('register/', register_user, name='register'),
    # ex: projects/
    path('projects/<str:git_username>/', projects, name='projects'),
    # ex: projects/5/
    path('projects/<int:project_id>/', project, name='project'),
    # ex: /5/issues/
    path('projects/<int:project_id>/issues/', issues, name='issues'),
    # ex: /issues/5/
    path('projects/<int:project_id>/issue/<int:issue_id>/', issue, name='issue'),
]