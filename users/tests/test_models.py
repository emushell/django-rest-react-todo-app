from django.test import TestCase
from django.contrib.auth import get_user_model

from .mixins import CreateUserProfileMixin
from .. import models

User = get_user_model()


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
