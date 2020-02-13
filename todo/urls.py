from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
    path('tasks/', views.TaskList.as_view(), name='task-list'),
    path('tasks/<int:pk>/', views.TaskDetail.as_view(), name='task-detail'),
    path('', views.api_root, name='api-root'),
]
