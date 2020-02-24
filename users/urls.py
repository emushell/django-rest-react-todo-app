from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.authtoken import views as rest_views
from rest_framework_simplejwt.views import TokenRefreshView
from token_jwt.custom_token import CustomTokenObtainPairView
from . import views

app_name = 'users'

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name='create-user'),
    path('email-verification/<str:verification_token>/',
         views.UserEmailVerification.as_view(),
         name='email-verification'
         ),

    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='api-token-refresh'),

    path('profiles/', views.ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='profile-detail'),

    path('password-reset/', views.PasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/',
         views.PasswordResetConfirmationView.as_view(),
         name='password-reset-confirm'
         ),
]
