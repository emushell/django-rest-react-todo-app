from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.authtoken import views as rest_views
from . import views

app_name = 'users'

urlpatterns = [
    path('profiles/', views.ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='profile-detail'),

    path('register/', views.UserCreate.as_view(), name='create-user'),
    path('email-verification/<str:verification_token>/',
         views.UserEmailVerification.as_view(),
         name='email-verification'
         ),
    path('password-reset/', views.PasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/',
         views.PasswordResetConfirmationView.as_view(),
         name='password-reset-confirm'
         ),
    # path('login/', rest_views.obtain_auth_token, name='login'),
]
