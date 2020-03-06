from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from .. import models

User = get_user_model()


class CreateUserProfileMixin:

    def __init__(self, *args, **kwargs):
        self.user = None
        self.user_profile = None

    def create_user(self, username='test_user', email='test@...', password=make_password('total_secret'), *args,
                    **kwargs):
        self.user = User.objects.create(username=username, email=email, password=password, *args, **kwargs)

    def create_user_profile(self, is_email_verified=True):
        self.create_user()
        self.user_profile = models.UserProfile.objects.create(email=self.user.email,
                                                              is_email_verified=is_email_verified,
                                                              user=self.user)
