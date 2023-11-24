from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.profile_index, name="profile"),
    path("draw/", views.profile_draw, name="pro_draw"),
    path("up/", views.profile_up, name="pro_up"),
    path("shinySame/", views.shinysame_data, name="shinySame"),
    path("pro/<int:id>", views.pro, name="pro"),
    path("create/", views.create_pro, name="create"),
    path("equipData/", views.equipData, name="equipData"),
    path("shopcartname/", views.shopcartname, name="shopcartname"),
    path("paying/", views.paying, name="paying"),
    path("finish/", views.finish, name="finish"),
    path("search/", views.search, name="search"),
    path("finalsearch/", views.finalsearch, name="finalsearch"),
    path("delete_item/<int:item_id>/", views.delete_item, name="delete_item"),
]
