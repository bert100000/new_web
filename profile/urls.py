from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("",views.profile_index,name='profile'),
    path("draw/",views.profile_draw,name='pro_draw'),
    path("up/",views.profile_up,name='pro_up'),
    path('shinySame/',views.shinysame_data,name='shinySame')
]