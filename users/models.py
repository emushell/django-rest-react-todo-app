import hashlib
from django.conf import settings
from django.db import models, transaction
from django.utils.crypto import get_random_string
from django.core.mail import EmailMultiAlternatives
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator

from base import models as base_models
from base import utils as base_utils

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
        # password = data.pop('password')
        # user = User(**data)
        # user.set_password(password)
        # user.save()

        user = User.objects.create_user(**data)

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
        user_verification_token = hashlib.sha1(hash_input).hexdigest()

        user_profile = self.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            verification_token=user_verification_token
        )
        return user_profile

    def activate_user(self, verification_token):
        """
        Activate user if token is valid.
        :param verification_token:
        :return:
        """
        try:
            user_profile = self.get(verification_token=verification_token)
        except ObjectDoesNotExist:
            return None

        user_profile.verification_token = UserProfile.VERIFIED
        user_profile.is_email_verified = True
        user_profile.save()
        return user_profile.user


class UserProfile(base_models.CreatedUpdatedModel, Verification):
    """
    Custom user profile class
    """

    VERIFIED = "VERIFIED"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=False)
    profile_pic = models.ImageField(default="default-profile-pic.png", null=True, blank=True)
    verification_token = models.CharField(max_length=100)

    objects = UserProfileRegistrationManager()

    class Meta:
        db_table = 'todo_user'
        verbose_name = 'user profile'
        verbose_name_plural = 'user profiles'

    def send_email(self, site):
        context = {
            'site': site,
            'verification_token': self.verification_token,
            'user': self.user,
            'site_name': getattr(settings, 'SITE_NAME', None),
            'expiration_days': getattr(settings, 'VERIFICATION_TOKEN_EXPIRY_DAYS', 4),
        }

        subject = render_to_string('users/registration_email_subject.html', context)
        subject = ''.join(subject.splitlines())

        content = render_to_string('users/registration_email_content.html', context)

        msg = EmailMultiAlternatives(subject, "", to=[self.user.email])
        msg.attach_alternative(content, "text/html")
        msg.send()

    def send_password_reset_email(self, site):
        """
        Send email to user with password reset link
        :param site:
        :return:
        """

        context = {
            'email': self.user.email,
            'site': site,
            'site_name': getattr(settings, 'SITE_NAME', None),
            'uid': base_utils.base36encode(self.user.pk),
            'user': self.user,
            'token': default_token_generator.make_token(self.user)
        }

        subject = render_to_string('users/password_reset_email_subject.html', context)

        subject = ''.join(subject.splitlines())

        message = render_to_string('users/password_reset_email_content.html', context)

        msg = EmailMultiAlternatives(subject, "", to=[self.user.email])
        msg.attach_alternative(message, 'text/html')
        msg.send()

    def __str__(self):
        return str(self.user)
