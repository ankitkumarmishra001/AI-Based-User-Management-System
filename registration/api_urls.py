from django.urls import path
from . import api_views

urlpatterns = [

    path(
        'profile/<int:user_id>/',
        api_views.profile_api,
        name='profile_api'
    ),

    path(
        'update-profile/<int:user_id>/',
        api_views.update_profile_api,
        name='update_profile_api'
    ),

    path(
        'raise-query/',
        api_views.raise_query_api,
        name='raise_query_api'
    ),

    path(
        'track-query/<str:ticket_id>/',
        api_views.track_query_api,
        name='track_query_api'
    ),

    path(
        'feedback/',
        api_views.feedback_api,
        name='feedback_api'
    ),

    path(
        'register/',
        api_views.register_api,
        name='register_api'
    ),

    path(
        'verify-user/',
        api_views.verify_user_api,
        name='verify_user_api'
    ),

    path(
        'security-check/',
        api_views.security_check_api,
        name='security_check_api'
    ),
]