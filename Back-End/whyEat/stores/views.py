from rest_framework import viewsets
from .serializers import StoreSerializer, StoreScoreSerializer, StoreMenuSerializer
from .models import Store, Store_score, Store_menu
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from sqlalchemy import create_engine


@api_view(['GET', 'POST'])
def store_list(request):
    if request.method == 'GET':
        engine = create_engine(
            'mysql+pymysql://root:1234@localhost/mydb', convert_unicode=True)
        conn = engine.connect()
        data = pd.read_sql_table('stores_store_score', conn)
        print(data.head)
        store = Store.objects.all()
        print(store)
        serializer = StoreSerializer(store, many=True)
        return Response(serializer.data)
    else:
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def store_detail(request, store_pk):
    store = get_object_or_404(Store, store_id=store_pk)
    if request.method == 'GET':
        serializer = StoreSerializer(store)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def score_list(request):
    if request.method == 'GET':
        score = Store_score.objects.all()
        serializer = StoreScoreSerializer(score, many=True)
        return Response(serializer.data)
    else:
        serializer = StoreScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
