from django.db import models
from django.urls import reverse
import json
from datetime import datetime
from django.conf import settings
import os, csv
from uuid import uuid4
from django.utils import timezone
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
    store_id = models.IntegerField()
    store_name = models.CharField(max_length=50)
    store_tel = models.CharField(max_length=20, null=True)
    store_address = models.CharField(max_length=255)
    store_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    store_longitude = models.DecimalField(max_digits=9, decimal_places=6)
    store_category = models.CharField(max_length=50,null = True)
    store_image = models.ImageField(null=True)

    @classmethod
    def import_store(cls):
        with open("./stores/fixtures/stores3.csv", newline='') as csvfile:
            about_stores = csv.reader(csvfile)
            i = 0
            for row in about_stores:
                # print(row)
                # print(type(row))
                Store.objects.create(
                    store_id = row[1],
                    store_name = row[2],
                    store_tel = row[5],
                    store_address = row[6],
                    store_latitude = row[7],
                    store_longitude = row[8],
                    store_category = row[9]
                )
                i += 1
                if i == 1000:
                    break

class Store_review(models.Model):
    objects = models.Manager()
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    user = models.IntegerField(null=False)
    score = models.IntegerField(null=False)
    content = models.TextField()

    @classmethod
    def import_review(cls):
        with open("./stores/fixtures/reviews3.csv", encoding="utf-8") as csvfile:
            reviews = csv.reader(csvfile)
            i = 0
            for row in reviews:
                Store_review.objects.create(
                    store_id = row[2],
                    user = row[3],
                    score = row[4],
                    content = row[5]
                )
                i += 1
                if i == 11:
                    break



class Store_menu(models.Model):
    objects = models.Manager()
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    menu_name = models.CharField(max_length=50)
    menu_price = models.IntegerField(null=True)

    @classmethod
    def import_menu(cls):
        with open("./stores/fixtures/menus2.csv", encoding="utf-8") as csvfile:
            menus = csv.reader(csvfile)
            i = 0
            for row in menus:
                Store_menu.objects.create(
                    store_id = row[2],
                    menu_name = row[3],
                    menu_price = row[4]
                )
                i += 1
                if i == 11:
                    break
