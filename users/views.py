from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics, status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from .permissions import UserIsOwnerUserProfile
from .serializers import ProfileSerializer, UserRegistrationSerializer, PasswordResetSerializer, \
    PasswordResetConfirmSerializer


# Create your views here.
class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class ProfileDetail(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated, UserIsOwnerUserProfile,)

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class UserCreate(generics.CreateAPIView):
    """
    Creates the user.
    """
    authentication_classes = ()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer


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

        user_profile = self.get_user_profile(request.data['email'])
        if user_profile:
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


class PasswordResetConfirmationView(views.APIView):
    """
    Password reset confirmation endpoint.
    """

    permission_classes = (AllowAny,)
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                'uidb64': kwargs['uidb64'],
                'token': kwargs['token']
            }
        )

        if serializer.is_valid(raise_exception=True):
            new_password = serializer.validated_data.get('new_password')
            user = serializer.user
            user.set_password(new_password)
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
