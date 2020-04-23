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
    # store_id = models.IntegerField(primary_key=True)
    store_name = models.CharField(max_length=50)
    store_tel = models.CharField(max_length=20, null=True)
    store_address = models.CharField(max_length=255, null=True)
    store_latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    store_longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    store_category = models.CharField(max_length=50,null = True)
    store_image = models.ImageField(null=True)

    @classmethod
    def import_store(cls):
        with open("./stores/fixtures/stores122.csv", newline='',encoding='utf-8' ) as csvfile:
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
                        store_category = row[7]
                    )
                except ObjectDoesNotExist:
                    pass
                    # alter table stores_store convert to character set utf8 collate utf8_unicode_ci;

class Store_review(models.Model):
    objects = models.Manager()
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    user = models.IntegerField(null=False)
    score = models.IntegerField(null=False)
    content = models.TextField(null=True)

    @classmethod
    def import_review(cls):
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
                        store = store_id,
                        user = row[3],
                        score = row[4],
                        content = row[5]
                    )
                except ObjectDoesNotExist:
                    pass
            # alter table stores_store_review convert to character set utf8mb4 collate utf8mb4_unicode_ci;

class Store_menu(models.Model):
    objects = models.Manager()
    store = models.ForeignKey(Store, on_delete=models.CASCADE,related_name='menu') 
    menu_name = models.CharField(max_length=50) #max_length를 100으로 변경
    menu_price = models.DecimalField(max_digits=9, decimal_places=0, null=True)

    @classmethod
    def import_menu(cls):
        with open("./stores/fixtures/menus2.csv", encoding="utf-8") as csvfile:
            menus = csv.reader(csvfile)
            for row in menus:
                store_id = Store.objects.only('store_id').get(store_id=row[2])
                print(row)
                Store_menu.objects.create(
                    store = store_id,
                    menu_name = row[3],
                    menu_price = row[4]
                )

        # alter table stores_store_menu convert to character set utf8mb4 collate utf8mb4_unicode_ci;