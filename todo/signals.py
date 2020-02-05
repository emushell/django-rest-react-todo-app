from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile

User = get_user_model()
DEFAULT_USER_GROUPS = ['default_user', 'delete_task', 'update_task', 'create_task']


# @receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        groups = Group.objects.filter(name__in=DEFAULT_USER_GROUPS)
        instance.groups.add(*groups)
        UserProfile.objects.create(user=instance, email=instance.email)
        print('Profile created')
