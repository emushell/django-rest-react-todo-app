from django.test import TestCase

from users.tests.mixins import CreateUserProfileMixin
from .. import models


class TaskTest(TestCase, CreateUserProfileMixin):
    """ Test module for Task model"""

    def setUp(self):
        self.create_user_profile()
        models.Task.objects.create(title="Test task", user_profile=self.user_profile)

    def test_create_task(self):
        test_task = models.Task.objects.get(title="Test task")
        self.assertEqual(test_task.title, "Test task")
        self.assertEqual(test_task.done, False)
