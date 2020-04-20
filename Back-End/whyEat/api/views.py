from rest_framework import viewsets
from .serializers import UserSerializer, HistroySerializer
from .models import User, User_history
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from django.shortcuts import get_object_or_404

# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # permission_classes = (permissions.IsAuthenticated, )
#     # queryset = ''
#     # def perform_create(self, serializer):
#     #     serializer.save(user=self.request.user)


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]: # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter) 

class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
class UserViewCreate(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewDetail(RetrieveAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewUpdate(UpdateAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewDelete(DestroyAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer

class HistroyViewCreate(CreateAPIView):
    lookup_fields = 'user_id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer


class HistroyView(RetrieveAPIView):
    lookup_field = 'user_id'
    queryset = User_history.objects.filter(user_id=1)
    print(queryset)
    serializer_class = HistroySerializer


class HistoryViewUpdate(UpdateAPIView):
    lookup_field = 'id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer


class HistroyViewDelete(DestroyAPIView):
    lookup_field = 'id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer
