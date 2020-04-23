from django.db import models
from django.urls import reverse
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,AbstractUser,
    PermissionsMixin)
from django.conf import settings
from rest_framework import serializers

class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            joined_at=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, username):
        return self.get(**{'{}__iexact'.format(self.model.USERNAME_FIELD): username})

    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)

# class UserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         """
#         주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
#         """
#         if not email:
#             raise ValueError(('Users must have an email address'))

#         user = self.model(
#             email=self.normalize_email(email),
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password):
#         """
#         주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
#         단, 최상위 사용자이므로 권한을 부여한다. 
#         """
#         user = self.create_user(
#             email=email,
#             password=password,
#         )

#         user.is_admin = True
#         user.save(using=self._db)
#         return user
        
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name='이메일')
    name = models.CharField(max_length=20, verbose_name='이름')
    nickname = models.CharField(unique=True, max_length=20, verbose_name='닉네임')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


# class User(AbstractUser):
#     email = models.EmailField(unique=True, verbose_name='이메일')
#     name = models.CharField(max_length=20, verbose_name='이름')
#     nickname = models.CharField(unique=True, max_length=20, verbose_name='닉네임')
#     # item = models.CharField(blank=True, null=True, max_length=50, verbose_name='유저 물건')
#     # price = models.IntegerField(blank=True, null=True, verbose_name='물건가격')
#     # monthly_cost = models.IntegerField(blank=True, null=True)
#     # image = models.ImageField(blank=True, null=True, verbose_name='프로필사진')
#     # birth = models.DateTimeField(blank=True, null=True, verbose_name='생일')


#     # is_active = models.BooleanField(default=True)
#     # is_admin = models.BooleanField(default=False)

#     objects = UserManager()
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name']


#     def get_full_name(self):
#         # The user is identified by their email address
#         return self.email
 
#     # def get_short_name(self):
#     #     # The user is identified by their email address
#     #     return self.email
 
#     def __str__(self):
#         return self.email
 
#     # def has_perm(self, perm, obj=None):
#     #     "Does the user have a specific permission?"
#     #     # Simplest possible answer: Yes, always
#     #     return True
 
#     # def has_module_perms(self, app_label):
#     #     "Does the user have permissions to view the app `app_label`?"
#     #     # Simplest possible answer: Yes, always
#     #     return True


    

class User_history(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='history')
    payment_date = models.DateTimeField(auto_now_add=True)
    user_breakfast = models.IntegerField(blank=True, null = True)
    user_lunch = models.IntegerField(blank=True, null = True)
    user_dinner = models.IntegerField(blank=True, null = True)
    total_paid = models.IntegerField(blank=True, null = True) 

    
    objects = models.Manager