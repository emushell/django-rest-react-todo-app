from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Task
from .permissions import UserIsOwnerTask
from .serializers import TaskSerializer


# Create your views here.
class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.userprofile)

    def get_queryset(self):
        return Task.objects.filter(user_profile__user=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, UserIsOwnerTask,)

    def get_queryset(self):
        return Task.objects.filter(user_profile__user=self.request.user)


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
