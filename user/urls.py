from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("",views.index_login,name='index'),
    path("register/",views.user_register,name='register'),
    path("practice/",views.practice,name='practice'),
    path("logout/",views.user_logout,name='logout'),
    
]