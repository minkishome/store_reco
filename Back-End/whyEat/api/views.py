from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView

# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     # permission_classes = (permissions.IsAuthenticated, )
#     # queryset = ''
#     # def perform_create(self, serializer):
#     #     serializer.save(user=self.request.user)

class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewDetail(RetrieveAPIView):
    lookup_field = 'no'
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewUpdate(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewDelete(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
