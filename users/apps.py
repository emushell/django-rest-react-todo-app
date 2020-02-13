from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'users'
    verbose_name = "TODO's User Module"

    def ready(self):
        import users.signals
