from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
from rest_framework import permissions

class UserView(viewsets.ModelViewSet):
    user = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, )
    queryset = ''
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)