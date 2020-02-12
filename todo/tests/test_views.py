from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from todo.tests.mixins import CreateUserProfileMixin


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


class TaskListCreateAPIVieTest(APITestCase, CreateUserProfileMixin):
    url = reverse("todo:task-list")
    url_login = reverse("login")

    def setUp(self):
        self.create_user_profile()
        self.data = {
            'username': self.user.username,
            'password': 'total_secret'
        }

    def test_create_task(self):
        self.assertEqual(self.user.is_active, True, 'Active User')

        response = self.client.post(self.url_login, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
