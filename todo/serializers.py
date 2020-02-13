from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    task_owner = serializers.ReadOnlyField(source='user_profile.first_name')

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'user_profile': {'read_only': True}}
