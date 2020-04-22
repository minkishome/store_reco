from rest_framework import viewsets
from .serializers import UserSerializer, HistroySerializer
from .models import User, User_history
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Sum

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


class UserExistsView(APIView):

    def get(self, request, *args, **kwargs):
        # use this if username is in url kwargs
        email = self.kwargs.get('email') 

        # use this if username is being sent as a query parameter
        email = self.request.query_params.get('email')  

        try:
            user = User.objects.get(email=email) # retrieve the user using username
        except User.DoesNotExist:
            return Response(data={'message':False}) # return false as user does not exist
        else:
            return Response(data={'message':True}) # Otherwise, return True

    
class UserViewCreate(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # def username_present(self):
    #     if User.objects.filter(user_email=self.kwargs['user_email']).exists():
    #         return True
    #     return False


class UserViewDetail(RetrieveAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class UserViewUpdate(UpdateAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class UserViewDelete(DestroyAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

class HistroyViewCreate(CreateAPIView):
    lookup_fields = 'user_id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer


class RankView(ListAPIView):
    lookup_field = 'id'
    # queryset = User_history.objects.all().order_by('total_paid')[:5]
    queryset = User_history.objects.extra(
    select={'fieldsum':'user_lunch + user_dinner + user_breakfast'},
    order_by=('fieldsum',)
    )[:5]
    serializer_class = HistroySerializer
    

class HistroyView(ListAPIView):
    lookup_field = 'user_id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer
    def get_queryset(self):
        return User_history.objects.filter(user_id=self.kwargs['user_id'])


class HistoryViewDetail(RetrieveAPIView):
    lookup_field = 'id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer
    def get_queryset(self):
        return User_history.objects.filter(id=self.kwargs['id'])
        


class HistoryViewUpdate(UpdateAPIView):
    lookup_field = 'user_id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer
    def get_queryset(self):
        return User_history.objects.filter(id=self.kwargs['id'], user_id=self.kwargs['user_id'])

class HistroyViewDelete(DestroyAPIView):
    lookup_field = 'user_id'
    queryset = User_history.objects.all()
    serializer_class = HistroySerializer
    def get_queryset(self):
        return User_history.objects.filter(id=self.kwargs['id'] ,user_id=self.kwargs['user_id'])
