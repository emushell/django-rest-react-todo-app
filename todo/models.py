import hashlib
from django.conf import settings
from django.db import models, transaction
from django.utils.crypto import get_random_string
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string

from base import models as base_models

User = get_user_model()


# Create your models here.
class Verification(models.Model):
    """
    Abstract class that provides fields for user email verification
    """
    is_email_verified = models.BooleanField(default=False)

    class Meta:
        abstract = True


class UserProfileRegistrationManager(models.Manager):

    @transaction.atomic
    def create_user_profile(self, data, site=None, send_email=True):
        """
        Create user and it's linked user profile.
        """
        password = data.pop('password')
        user = User(**data)
        user.set_password(password)
        user.save()

        user_profile = self.create_profile(user)

        if send_email:
            user_profile.send_email(site)

        return user

    def create_profile(self, user):
        """
        Create user profile for giver user
        """

        username = getattr(user, User.USERNAME_FIELD)
        hash_input = (get_random_string(5) + username + get_random_string(5)).encode('utf-8')
        user_verification_key = hashlib.sha1(hash_input).hexdigest()

        user_profile = self.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            verification_key=user_verification_key
        )
        return user_profile

    def activate_user(self, verification_key):
        print(verification_key)


class UserProfile(base_models.CreatedUpdatedModel, Verification):
    """
    Custom user profile class
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=False)
    profile_pic = models.ImageField(default="default-profile-pic.png", upload_to="media", null=True, blank=True)
    verification_key = models.CharField(max_length=100)

    objects = UserProfileRegistrationManager()

    class Meta:
        db_table = 'todo_user'
        verbose_name = 'user profile'
        verbose_name_plural = 'user profiles'

    def send_email(self, site):
        context = {
            'site': site,
            'verification_key': self.verification_key,
            'user': self.user,
            'site_name': getattr(settings, 'SITE_NAME', None),
            'expiration_days': getattr(settings, 'VERIFICATION_KEY_EXPIRY_DAYS', 4),
        }

        subject = render_to_string('todo/registration_email_subject.html', context)
        subject = ''.join(subject.splitlines())

        content = render_to_string('todo/registration_email_content.html', context)

        msg = EmailMultiAlternatives(subject, "", to=["emushell8@gmail.com"])
        msg.attach_alternative(content, "text/html")
        msg.send()

    def __str__(self):
        return str(self.user)


class Task(models.Model):
    user_profile = models.ForeignKey(UserProfile, null=False, on_delete=models.DO_NOTHING, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    done = models.BooleanField(default=False)

    class Meta:
        db_table = 'tasks'

    @classmethod
    def create(cls, title):
        task = cls(title=title)
        return task

    def __str__(self):
        return self.title
