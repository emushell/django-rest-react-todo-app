from django.urls import path
# from rest_framework.authtoken import views as rest_views
from . import views

urlpatterns = [
    path('tasks/', views.TaskList.as_view(), name='task-list'),
    path('tasks/<int:pk>/', views.TaskDetail.as_view(), name='task-detail'),
    path('profiles/', views.ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='profile-detail'),

    path('register/', views.UserCreate.as_view(), name='create-user'),
    path('email-verification/<str:verification_token>/', views.UserEmailVerification.as_view(),
         name='email-verification'),
    path('password-reset/', views.PasswordResetView.as_view(), 'password-reset'),
    # path('login/', rest_views.obtain_auth_token, name='login'),
    path('', views.api_root),
]
