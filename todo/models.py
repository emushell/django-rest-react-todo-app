from django.db import models

from users.models import UserProfile


class Task(models.Model):
    user_profile = models.ForeignKey(UserProfile, null=False, on_delete=models.DO_NOTHING, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    done = models.BooleanField(default=False)

    class Meta:
        db_table = 'tasks'

    def __str__(self):
        return self.title
