from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("",views.index_login,name='index'),
    path("register/",views.user_register,name='register')
]