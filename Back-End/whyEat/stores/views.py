from rest_framework import viewsets
from .serializers import StoreSerializer, StoreReviewSerializer, StoreMenuSerializer
from .models import Store, Store_review, Store_menu
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class StoreView(ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class StoreViewDetail(RetrieveAPIView):
    lookup_field = 'id'
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class StoreMenuView(ListAPIView):
    lookup_field = 'store_id'
    queryset = Store_menu.objects.all()
    serializer_class = StoreMenuSerializer
    def get_queryset(self):
        return Store_menu.objects.filter(store_id=self.kwargs['store_id'])

class StoreReviewView(ListAPIView):
    lookup_field = 'store_id'
    queryset = Store_review.objects.all()
    serializer_class = StoreReviewSerializer
    def get_queryset(self):
        return Store_review.objects.filter(store_id=self.kwargs['store_id'])