from rest_framework import serializers
from .models import User, User_history
# from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class UserCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class HistroySerializer(serializers.ModelSerializer):

    class Meta:
        model = User_history
        fields = '__all__'