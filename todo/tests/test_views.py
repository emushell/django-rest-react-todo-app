import json
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from users import models
from ..models import Task
from ..serializers import TaskSerializer
from users.tests.mixins import CreateUserProfileMixin

User = get_user_model()


class TaskListTestCase(APITestCase, CreateUserProfileMixin):
    login_url = reverse("users:login")
    task_list_url = reverse("todo:task-list")

    def setUp(self):
        self.create_user_profile()
        self.data = {
            'username': self.user.username,
            'password': 'total_secret'
        }
        response = self.client.post(self.login_url, self.data, format='json')
        self.jwt_token = response.data['access']
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(self.jwt_token))

    def test_create_task(self):
        response = self.client.post(self.task_list_url, {"title": "Test task!"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_tasks(self):
        Task.objects.create(user_profile=self.user_profile, title="Test task!")
        response = self.client.get(self.task_list_url)
        self.assertTrue(len(json.loads(response.content)) == Task.objects.count())


class TaskDetailTestCase(APITestCase, CreateUserProfileMixin):
    login_url = reverse("users:login")

    def setUp(self):
        self.create_user_profile()
        self.data = {
            'username': self.user.username,
            'password': 'total_secret'
        }
        response = self.client.post(self.login_url, self.data, format='json')
        self.jwt_token = response.data['access']
        self.task = Task.objects.create(user_profile=self.user_profile, title='Test task!')
        self.task_url = reverse("todo:task-detail", kwargs={"pk": self.task.id})
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(self.jwt_token))

    def test_task_object_bundle(self):
        response = self.client.get(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task_serialize_data = TaskSerializer(instance=self.task).data
        response_data = json.loads(response.content)
        self.assertEqual(response_data, task_serialize_data)

    def test_task_object_updated_authorization(self):
        data = {
            "username": "test-user-2",
            "email": "new@user.test",
            "password": "total_secret"
        }
        user = User.objects.create_user(**data)
        user_profile = models.UserProfile.objects.create(email=user.email,
                                                         is_email_verified=True,
                                                         user=user)
        response = self.client.post(self.login_url,
                                    {'username': user.username, 'password': 'total_secret'},
                                    format='json')
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(response.data['access']))

        # HTTP PUT
        response = self.client.put(self.task_url, {"title": "Hacked Test task!"})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # HTTP PATCH
        response = self.client.patch(self.task_url, {"title": "Hacked Test task"})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_task_object_update(self):
        response = self.client.put(self.task_url, {"title": "New Test Task!"})
        response_data = json.loads(response.content)
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(response_data.get("title"), task.title)

    def test_task_object_partial_update(self):
        response = self.client.patch(self.task_url, {"done": True})
        response_data = json.loads(response.content)
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(response_data.get("done"), task.done)

    def test_task_object_delete_authorization(self):
        data = {
            "username": "test-user-2",
            "email": "new@user.test",
            "password": "total_secret"
        }
        user = User.objects.create_user(**data)
        user_profile = models.UserProfile.objects.create(email=user.email,
                                                         is_email_verified=True,
                                                         user=user)
        response = self.client.post(self.login_url,
                                    {'username': user.username, 'password': 'total_secret'},
                                    format='json')
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(response.data['access']))
        response = self.client.delete(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_todo_object_delete(self):
        response = self.client.delete(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
