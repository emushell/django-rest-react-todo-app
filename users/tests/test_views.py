from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import UserProfile
from .mixins import CreateUserProfileMixin

User = get_user_model()


class RegistrationTestCase(APITestCase):
    register_url = reverse("users:create-user")

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
        email_verification_url = reverse("users:email-verification",
                                         kwargs={"verification_token": user_profile.verification_token})
        response = self.client.get(email_verification_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_email_wrong_token(self):
        email_verification_url = reverse("users:email-verification",
                                         kwargs={"verification_token": "test-token"})
        response = self.client.get(email_verification_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class PasswordResetViewTestCase(APITestCase):
    password_reset_url = reverse("users:password-reset")

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
    list_url = reverse("users:profile-list")

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
        url = reverse("users:profile-detail", kwargs={"pk": self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)

    def test_profile_details_un_authenticated(self):
        self.client.force_authenticate(user=None)
        url = reverse("users:profile-detail", kwargs={"pk": self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
