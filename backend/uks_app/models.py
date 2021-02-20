from django.contrib.auth.models import User
from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Project(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=120)
    git_repo = models.CharField(max_length=120)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)


class Label(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)


class IssueState(models.TextChoices):
    OPEN = "Open"
    CLOSED = "Closed"


class Issue(models.Model):
    title = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    labels = models.ManyToManyField(Label, blank=True)
    state = models.CharField(choices=IssueState.choices, max_length=6)
    related_issues = models.ManyToManyField('self', blank=True)


class ControlPoint(models.Model):
    date = models.DateField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class Event(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)


class Comment(Event):
    text = models.CharField(max_length=240)


class StateChange(Event):
    new_state = models.CharField(choices=IssueState.choices, max_length=6)


class ResponsibleChange(Event):
    responsible = models.ForeignKey(Account,
                                    on_delete=models.SET_NULL,
                                    null=True)


class ControlPointChange(Event):
    control_point = models.ForeignKey(ControlPoint,
                                      on_delete=models.SET_NULL,
                                      null=True)


class CodeChange(Event):
    url = models.URLField(max_length=120)


class CommentChange(Event):
    changed_comment = models.ForeignKey(Comment,
                                        on_delete=models.CASCADE)


class Milestone(models.Model):
    title = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
