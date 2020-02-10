from django.test import TestCase
from django.contrib.auth import get_user_model

from .. import models

User = get_user_model()


class CreateUserProfileMixin:

    def __init__(self, *args, **kwargs):
        self.user = None
        self.user_profile = None

    def create_user(self, username='test_user', email='test@...', password='total_secret', *args, **kwargs):
        self.user = User.objects.create(username=username, email=email, password=password, *args, **kwargs)

    def create_user_profile(self):
        self.create_user()
        self.user_profile = models.UserProfile.objects.create(email=self.user.email, user=self.user)


class UserProfileTest(TestCase, CreateUserProfileMixin):
    """ Test module for UserProfile model"""

    def test_user_profile_model_created(self):
        self.create_user_profile()
        user_profile = models.UserProfile.objects.get(email='test@...')
        self.assertEqual(user_profile, self.user_profile)
        self.assertEqual(user_profile.is_email_verified, False)
        self.assertEqual(user_profile.verification_token, '')

    def test_create_profile(self):
        self.create_user()
        user_profile_create = models.UserProfile.objects.create_profile(self.user)
        user_profile = models.UserProfile.objects.get(email=self.user.email)
        self.assertEqual(user_profile_create, user_profile)
        self.assertEqual(user_profile_create.is_email_verified, False)
        self.assertIsNotNone(user_profile.verification_token)
        self.assertNotEqual(user_profile.verification_token, '')

    def test_create_user_profile(self):
        user_data = {
            'username': 'test_user',
            'email': 'test@...',
            'password': 'total_secret'
        }
        user = models.UserProfile.objects.create_user_profile(data=user_data, site='', send_email=False)
        user_profile = models.UserProfile.objects.get(email=user.email)
        self.assertEqual(user.email, user_profile.email)
        self.assertEqual(user_profile.is_email_verified, False)
        self.assertIsNotNone(user_profile.verification_token)
        self.assertNotEqual(user_profile.verification_token, '')

    def test_activate_user(self):
        self.create_user()
        models.UserProfile.objects.create_profile(self.user)
        user_profile = models.UserProfile.objects.get(email=self.user.email)
        models.UserProfile.objects.activate_user(user_profile.verification_token)
        user_profile = models.UserProfile.objects.get(email=self.user.email)
        self.assertEqual(user_profile.verification_token, models.UserProfile.VERIFIED)


class TaskTest(TestCase, CreateUserProfileMixin):
    """ Test module for Task model"""

    def setUp(self):
        self.create_user_profile()
        models.Task.objects.create(title="Test task", user_profile=self.user_profile)

    def test_create_task(self):
        test_task = models.Task.objects.get(title="Test task")
        self.assertEqual(test_task.title, "Test task")
        self.assertEqual(test_task.done, False)
