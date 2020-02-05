from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from .models import Task, UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()


class TaskSerializer(serializers.ModelSerializer):
    task_owner = serializers.ReadOnlyField(source='user_profile.first_name')

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'user_profile': {'read_only': True}}


class ProfileSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = UserProfile
        fields = '__all__'


# class ProfileWithTaskDetailsSerializer(serializers.ModelSerializer):
#     tasks = TaskSerializer(many=True, read_only=True, )
#
#     class Meta:
#         model = Profile
#         fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        write_only=True
    )

    def validate_password2(self, value):
        data = self.get_initial()
        password = data['password']
        if password != value:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        return value

    def create(self, validated_data):
        user_data = {
            'username': validated_data.get('username'),
            'email': validated_data.get('email'),
            'password': validated_data.get('password'),
            'first_name': validated_data.get('first_name'),
            'last_name': validated_data.get('last_name')
        }

        user = UserProfile.objects.create_user_profile(
            data=user_data,
            site=get_current_site(self.context['request']),
            send_email=True
        )

        # user = User.objects.create(
        #     email=self.validated_data['email'],
        #     username=self.validated_data['username'],
        # )

        # password = self.validated_data['password']
        # password2 = self.validated_data['password2']
        #
        # if password != password2:
        #     raise serializers.ValidationError({'password': 'Passwords must match.'})
        # user.set_password(self.validated_data['password'])
        # user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
