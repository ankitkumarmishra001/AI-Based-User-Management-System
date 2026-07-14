from rest_framework import serializers
from .models import UserRegistration, Query, Feedback


class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserRegistration
        fields = '__all__'


class QuerySerializer(serializers.ModelSerializer):

    class Meta:
        model = Query
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = '__all__'