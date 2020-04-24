from django.db import models
from django.urls import reverse
import json
from datetime import datetime
from django.conf import settings
import os, csv
from uuid import uuid4
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
# Create your models here.

# def image_name(instance, filename): #이미지 업로드이름으로 하는것
#     extension = os.path.splitext(filename)[-1].lower() # 확장자 추출
#     # 길이 32 인 uuid 값
#     uuid_name = uuid4().hex
#     named = Store.store_name
#     return '/'.join([
#     named,
#     uuid_name + extension,
#   ])

class Store(models.Model):
    objects = models.Manager()
    store_id = models.IntegerField(unique=True)
    store_name = models.CharField(max_length=50)
    store_tel = models.CharField(max_length=20, null=True)
    store_address = models.CharField(max_length=255, null=True)
    store_latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    store_longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    store_category = models.CharField(max_length=50,null = True)
    store_image = models.TextField(null=True, max_length=500)
    store_price = models.DecimalField(max_digits=9, decimal_places=0, null=True, blank=True)
    score_mean = models.IntegerField(null=True)
    @classmethod
    def import_store(cls):
        with open("./stores/fixtures/store_data.csv", newline='',encoding='utf-8' ) as csvfile:
            about_stores = csv.reader(csvfile)
            next(about_stores)
            for row in about_stores:
                print(row)
                # print(type(row))
                try:
                    Store.objects.create(
                        store_id = row[1],
                        store_name = row[2],
                        store_tel = row[3],
                        store_address = row[4],
                        store_latitude = row[5],
                        store_longitude = row[6],
                        store_category = row[7],
                        store_image = row[8],

                    )
                except ObjectDoesNotExist:
                    pass
                    # alter table stores_store convert to character set utf8 collate utf8_unicode_ci;
# 유저 / 스토어네임 / 스토어이미지/  평점 /  가격 / 스토어아이디 (추가)

# 스토어 아이디  / 위도/경도/ 주소/ 전화번호 / 이미지 /카테고리 

# 스토어아이디 / 메뉴 / 가격 

class Store_score(models.Model): # Score
    objects = models.Manager()
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE,related_name='review')
    store_name = models.CharField(null=True, max_length=50)
    user_id = models.CharField(max_length='50', null=False)
    score = models.IntegerField(null=False)
    rep_price = models.IntegerField(null= True, verbose_name='대표 메뉴 가격')
    store_image = models.TextField(null=True, max_length=500)

    @classmethod
    def import_score(cls):
        with open("./stores/fixtures/reviews6.csv",newline='', encoding="utf-8") as csvfile:
            reviews = csv.reader(csvfile)
            next(reviews)
            for row in reviews:
                print(row)
                try:
                    store_id = Store.objects.only('store_id').get(store_id=row[2])
                    # print(store_id)
                    Store_review.objects.create(
                        # store_id = int(row[2]),
                        store_id = store_id,
                        user = row[3],
                        score = row[4],

                    )
                except ObjectDoesNotExist:
                    pass
            # alter table stores_store_review convert to character set utf8mb4 collate utf8mb4_unicode_ci;

class Store_menu(models.Model):
    objects = models.Manager()
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE,related_name='menu') 
    menu_name = models.CharField(max_length=200, null=True) #max_length를 100으로 변경
    menu_price = models.DecimalField(max_digits=9, decimal_places=0, null=True)

    @classmethod
    def import_menu(cls):
        with open("./stores/fixtures/seoul_menu_data.csv", encoding="utf-8") as csvfile:
            menus = csv.reader(csvfile)
            next(menus)
            for row in menus:
                try:
                    store_id = Store.objects.only('store_id').get(store_id=row[1])
                    print(store_id)
                    # print(row)
                    if row[3] == '':
                        row[3] = 0.0
                    Store_menu.objects.create(
                        store = store_id,
                        menu_name = row[2],
                        menu_price = row[3]
                    )
                except ObjectDoesNotExist:
                    pass
        # alter table stores_store_menu convert to character set utf8mb4 collate utf8mb4_unicode_ci;