from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # custom override to check whether the email is validated or not
        # if email is not verified jwt token will not be issued
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            if not user.userprofile.is_email_verified:
                data = {
                    "email": "E-mail is not verified."
                }
                return Response(data, status=status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)
