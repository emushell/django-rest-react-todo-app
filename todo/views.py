from rest_framework import generics, status, views
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.permissions import AllowAny
# from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Task, UserProfile
# from .permissions import IsOwnerOrReadOnly
from .serializers import TaskSerializer, ProfileSerializer, UserRegistrationSerializer, PasswordResetSerializer


# Create your views here.
class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.profile)

    def get_queryset(self):
        return Task.objects.filter(user_profile__user=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user_profile__user=self.request.user)


class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class ProfileDetail(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class UserCreate(generics.CreateAPIView):
    """
    Creates the user.
    """
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     user = serializer.instance
    #     token, created = Token.objects.get_or_create(user=user)
    #     data = serializer.data
    #     data["token"] = token.key
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class UserEmailVerification(generics.RetrieveAPIView):
    """
    Verify user and it's email.
    """
    permission_classes = (AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        verification_token = kwargs.get('verification_token', None)
        verified_user = self.verify_user(verification_token)
        if verified_user:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def verify_user(self, verification_token):
        return UserProfile.objects.activate_user(verification_token)


class PasswordResetView(views.APIView):
    """
    Endpoint for sending email to user with password reset link
    """
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request):

        user_profile = self.get_user_profile(request.data.email)
        if user_profile:
            # TODO send password reset email
            user_profile.send_password_reset_email(
                site=get_current_site(request)
            )
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)

    def get_user_profile(self, email):

        try:
            user_profile = UserProfile.objects.get(user__email=email)
        except:
            return None
        return user_profile

# TODO implement password reset confirm view.

@api_view(['GET'])
@permission_classes([AllowAny, ])
def api_root(request, format=None):
    return Response({
        'profiles': reverse('profile-list', request=request, format=format),
        'tasks': reverse('task-list', request=request, format=format),
        'register': reverse('create-user', request=request, format=format),
        # 'email-verification': reverse('email-verification', request=request, format=format),
        # 'login': reverse('login', request=request, format=format),
    })
