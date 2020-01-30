from django.contrib import admin
from .models import Task, Profile


class TaskAdmin(admin.ModelAdmin):
    pass


class ProfileAdmin(admin.ModelAdmin):
    pass


# Register your models here.
admin.site.register(Task, TaskAdmin)
admin.site.register(Profile, ProfileAdmin)
