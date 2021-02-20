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
    # ex: /issues/user1/hello-world/
    path('issues/<str:git_username>/<str:project_name>/', issues, name='issues'),
    # ex: /issues/5/
    path('projects/<int:project_id>/issue/<int:issue_id>/', issue, name='issue'),
    path('issues/create', create_issue, name='issue'),

    path('labels/all', get_labels, name='labels'),
    path('labels/create', create_label, name='label'),

    path('milestones/all', get_milestones, name='milestones'),
    path('milestones/create', create_milestone, name='milestone'),

    path('repos/<str:git_username>/<str:project_name>/issues/<int:number_of_issue>/events/', events, name='events')
]