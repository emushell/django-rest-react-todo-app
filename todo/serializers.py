from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task, Profile


class TaskSerializer(serializers.ModelSerializer):
    task_owner = serializers.ReadOnlyField(source='user_profile.first_name')

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'user_profile': {'read_only': True}}


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

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
