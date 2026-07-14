from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),

      path(
        'raise-query/',
        views.raise_query,
        name='raise_query'
    ),

    path(
        'feedback/',
        views.submit_feedback,
        name='feedback'
    ),

    path(
    'verify/',
    views.verify_user,
    name='verify_user'
),

path(
    'security-check/',
    views.security_check,
    name='security_check'
),

path(
    'dashboard/',
    views.dashboard,
    name='dashboard'
),

path(
    'profile/',
    views.view_profile,
    name='view_profile'
),

path(
    'update-profile/',
    views.update_profile,
    name='update_profile'
),

path(
    'track-query/',
    views.track_query,
    name='track_query'
),
]