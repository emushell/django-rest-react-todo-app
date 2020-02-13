import logging
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()
DEFAULT_USER_GROUPS = ['default_user', 'delete_task', 'update_task', 'create_task']

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def add_default_user_groups(sender, instance, created, **kwargs):
    if created:
        groups = Group.objects.filter(name__in=DEFAULT_USER_GROUPS)
        instance.groups.add(*groups)
        logger.info("Default groups added to user {}".format(str(instance)))
