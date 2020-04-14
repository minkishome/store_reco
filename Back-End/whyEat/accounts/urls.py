from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

import accounts.api

app_name='accounts'

router = routers.DefaultRouter()
router.register('accounts', accounts.api.UserViewSet)

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    # url(r'^api/doc', get_swagger_view(title='Rest API Document')),
    url(r'^api/v1/', include((router.urls, 'accounts'), namespace='api')),
]