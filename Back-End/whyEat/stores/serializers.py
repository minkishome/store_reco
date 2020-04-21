from rest_framework import serializers
from .models import Store, Store_review, Store_menu
# from django.contrib.auth.models import User

class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = '__all__'

class StoreReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store_review
        fields = '__all__'


class StoreMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store_menu
        fields = '__all__'