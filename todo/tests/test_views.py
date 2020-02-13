import json
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Task, UserProfile
from ..serializers import TaskSerializer
from todo.tests.mixins import CreateUserProfileMixin

User = get_user_model()


class RegistrationTestCase(APITestCase):
    register_url = reverse("todo:create-user")

    def test_registration(self):
        data = {
            'username': 'test-user',
            'email': 'test@localhost.test',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'total-secret-password',
            'password2': 'total-secret-password',
        }

        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class UserEmailVerificationTestCase(APITestCase):

    def setUp(self):
        self.data = {
            'username': 'test-user',
            'email': 'test@localhost.test',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'total-secret-password',
        }
        self.user = UserProfile.objects.create_user_profile(data=self.data, site=None, send_email=False)

    def test_verify_email(self):
        user_profile = UserProfile.objects.get(user=self.user)
        email_verification_url = reverse("todo:email-verification",
                                         kwargs={"verification_token": user_profile.verification_token})
        response = self.client.get(email_verification_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_email_wrong_token(self):
        email_verification_url = reverse("todo:email-verification",
                                         kwargs={"verification_token": "test-token"})
        response = self.client.get(email_verification_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class PasswordResetViewTestCase(APITestCase):
    password_reset_url = reverse("todo:password-reset")

    def setUp(self):
        self.data = {
            'username': 'test-user',
            'email': 'test@localhost.test',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'total-secret-password',
        }
        self.user = UserProfile.objects.create_user_profile(data=self.data, site=None, send_email=False)

    def test_password_reset(self):
        response = self.client.post(self.password_reset_url, {"email": self.data['email']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProfileDetailTestCase(APITestCase, CreateUserProfileMixin):
    login_url = reverse("login")
    list_url = reverse("todo:profile-list")

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

    def test_profile_list_authenticated(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_profile_list_un_authenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_details_authenticated(self):
        url = reverse("todo:profile-detail", kwargs={"pk": self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)

    def test_profile_details_un_authenticated(self):
        self.client.force_authenticate(user=None)
        url = reverse("todo:profile-detail", kwargs={"pk": self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TaskListTestCase(APITestCase, CreateUserProfileMixin):
    login_url = reverse("login")
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
    login_url = reverse("login")

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
        new_user = User.objects.create_user(username="test-user-2",
                                            email="new@user.test",
                                            password="total_secret")
        response = self.client.post(self.login_url,
                                    {'username': new_user.username, 'password': 'total_secret'},
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
        new_user = User.objects.create_user(username="test-user-2",
                                            email="new@user.test",
                                            password="total_secret")
        response = self.client.post(self.login_url,
                                    {'username': new_user.username, 'password': 'total_secret'},
                                    format='json')
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(response.data['access']))
        response = self.client.delete(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_todo_object_delete(self):
        response = self.client.delete(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
