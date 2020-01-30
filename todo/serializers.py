from rest_framework import serializers
from .models import Task, Profile


class TaskSerializer(serializers.ModelSerializer):
    task_owner = serializers.ReadOnlyField(source='user_profile.first_name')

    class Meta:
        model = Task
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = Profile
        fields = '__all__'

# class ProfileWithTaskDetailsSerializer(serializers.ModelSerializer):
#     tasks = TaskSerializer(many=True, read_only=True, )
#
#     class Meta:
#         model = Profile
#         fields = '__all__'
