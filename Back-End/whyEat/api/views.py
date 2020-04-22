from rest_framework import viewsets
from .serializers import UserSerializer, HistroySerializer, UserCreationSerializer
from .models import User, User_history
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny 

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
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)


class UserView(ListAPIView):
    # print(User.objects.all())
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserExistsView(APIView):
  def get(self, request, *args, **kwargs):
    exist_query = self.kwargs.get('email')
    try:
      User.objects.get(email=exist_query)
    except User.DoesNotExist:
    #   print('False')
      return Response(data={'message': False}) # return false as user does not exist
    else:
    #   print('True')
      return Response(data={'message': True}) # Otherwise, return True
      # if not User.objects.get(email=f'{exist_query}'):
      #   print('True')
      #   return Response(data={'message':True})
      # else:
      #   print('False')
      #   return Response(data={'message':True})

      # print('req', request.json())
      # use this if username is in url kwargs
      # email = self.kwargs.get('email')

      # # use this if username is being sent as a query parameter
      # email = self.request.query_params.get('email')


# class UserViewCreate(CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer()

@api_view(['POST'])
# @permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    print(1111, serializer)
    # print(type(request.data))
    if serializer.is_valid():
        user = serializer.save()  # 최초 저장 후, 
        # user.set_password(user.password)  # password 암호화하기 위해서 갈아끼운다. 
        user.save()
        return Response(status=200, data={'message': '회원가입 성공'}) 
    else:
        print(serializer.error_messages)
        return Response(status=400, data={'message': serializer.error_messages}) 

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
    select={'fieldsum': 'user_lunch + user_dinner + user_breakfast'},
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
        return User_history.objects.filter(id=self.kwargs['id'] , user_id=self.kwargs['user_id'])
