from rest_framework import serializers
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import default_token_generator
from .models import Task, UserProfile
from django.contrib.auth import get_user_model

from base import utils as base_utils

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

        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True
    )

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class PasswordResetConfirmSerializer(serializers.Serializer):
    token_generator = default_token_generator

    def __init__(self, *args, **kwargs):
        context = kwargs['context']
        uidb64 = context.get('uidb64')
        token = context.get('token')
        if uidb64 and token:
            uid = base_utils.base36decode(uidb64)
            self.user = self.get_user(uid)
            self.valid_attempt = self.token_generator.check_token(self.user, token)
        super().__init__(*args, **kwargs)

    def get_user(self, uid):
        try:
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        return user

    new_password = serializers.CharField(
        style={'input_type': 'password'},
        label="New Password",
        write_only=True
    )

    new_password2 = serializers.CharField(
        style={'input_type': 'password'},
        label="Confirm Password",
        write_only=True
    )

    def validate_new_password2(self, value):
        data = self.get_initial()
        new_password = data.get('new_password')
        if new_password != value:
            raise serializers.ValidationError("Passwords doesn't match.")
        return value

    def validate(self, attrs):
        if not self.valid_attempt:
            raise serializers.ValidationError("Operation not allowed.")
        return attrs

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass
