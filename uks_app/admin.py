from django.contrib import admin

from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(Issue)
admin.site.register(Label)
admin.site.register(ControlPoint)
admin.site.register(Comment)
admin.site.register(StateChange)
admin.site.register(ResponsibleChange)
admin.site.register(ControlPointChange)
admin.site.register(CodeChange)
admin.site.register(CommentChange)
