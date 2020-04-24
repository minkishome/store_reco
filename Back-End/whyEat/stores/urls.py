from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('store_list/', views.store_list),
    path('store_detail/<int:store_pk>/', views.store_detail),
    path('score_list/', views.score_list),
]