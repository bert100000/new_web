from django.contrib import admin

# Register your models here.
from user.models import student

class studentAdmin(admin.ModelAdmin):
    list_display = ('id','cName','cSex','cBirthday','cEmail','cPhone','cAddr')
    
admin.site.register(student,studentAdmin)