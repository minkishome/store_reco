from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^store_list/$', views.StoreView.as_view(), name='store_list'),
    url(r'^store_list/(?P<id>\d+)/$', views.StoreViewDetail.as_view(), name='store_detail'),
    url(r'^store_list/(?P<store_id>\d+)/menu$', views.StoreMenuView.as_view(), name='store_menu'),
    url(r'^store_list/(?P<store_id>\d+)/review$', views.StoreReviewView.as_view(), name='store_review'),
]