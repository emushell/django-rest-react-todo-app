from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Task, Profile
# from .permissions import IsOwnerOrReadOnly
from .serializers import TaskSerializer, ProfileSerializer, UserSerializer


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
        return Profile.objects.filter(user=self.request.user)


class ProfileDetail(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class UserCreate(generics.CreateAPIView):
    """
    Creates the user.
    """
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.instance
        token, created = Token.objects.get_or_create(user=user)
        data = serializer.data
        data["token"] = token.key
        headers = self.get_success_headers(serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def api_root(request, format=None):
    return Response({
        'profiles': reverse('profile-list', request=request, format=format),
        'tasks': reverse('task-list', request=request, format=format),
        'register': reverse('create-user', request=request, format=format),
        # 'login': reverse('login', request=request, format=format),
    })
