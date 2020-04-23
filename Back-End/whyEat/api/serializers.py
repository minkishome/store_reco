from rest_framework import serializers
from .models import User, User_history
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User
<<<<<<< HEAD

class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = User_history
        fields = '__all__'
=======
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
>>>>>>> ace7afa67e125cbcf281697ddaaf0c174066cddc

class UserSerializer(serializers.ModelSerializer):
    history = HistorySerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('email', 'name', 'nickname')

class UserCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'




