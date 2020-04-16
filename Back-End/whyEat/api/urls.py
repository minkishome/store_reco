# from django.urls import path, include
# from rest_framework.urlpatterns import format_suffix_patterns
# from .views import UserView

# user_list = UserView.as_view({
#     'post': 'create',
#     'get': 'list'
# })
# # post_detail = UserView.as_view({
# #     'get': 'retrieve',
# #     'put': 'update',
# #     'patch': 'partial_update',
# #     'delete': 'destroy'
# # })
# urlpatterns = format_suffix_patterns([
#     path('auth/', include('rest_framework.urls', namespace='rest_framework')),
#     path('users/', user_list, name='user_list'),
#     # path('posts/<int:pk>/', post_detail, name='post_detail'),
# ])

from django.conf.urls import url, include
from . import views
from django.conf import settings
from django.conf.urls.static import static
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'user', views.UserView)

urlpatterns = [
    url('api-auth/', include('rest_framework.urls')),
    # url(r'^', include(router.urls)),
    url(r'^$', views.UserView.as_view(), name='user'),
    url(r'^user_list/$', views.UserView.as_view(), name='user_list'),
    url(r'^user_list/(?P<no>\d+)/$', views.UserViewDetail.as_view(), name='user_detail'),
    url(r'^user_list/(?P<no>\d+)/update$', views.UserViewUpdate.as_view(), name='user_update'),
    url(r'^user_list/(?P<no>\d+)/delete$', views.UserViewDelete.as_view(), name='user_delete'),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)