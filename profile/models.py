from django.db import models
from django.contrib.auth.models import User


# 裝備資料、使用者填寫功能
class profile(models.Model):
    title = models.CharField(max_length=100, null=False)  # 預設是False(可不寫但必填)

    equipName = models.CharField(max_length=30, null=True)
    attack = models.CharField(max_length=30, null=True)
    defence = models.CharField(max_length=30, null=True)
    lucky = models.CharField(max_length=30, null=True)
    magic = models.CharField(max_length=30, null=True)
    value1 = models.CharField(max_length=30, null=True)
    value2 = models.CharField(max_length=30, null=True)
    value3 = models.CharField(max_length=30, null=True)
    finalImgPath = models.CharField(max_length=255)

    text = models.TextField(max_length=30, blank=True)  # 可為空值
    created = models.DateTimeField(auto_now_add=True)  # 新增時就自動給時間
    date_completed = models.DateTimeField(null=True, blank=True)  # 可為空也可為null
    important = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # user跟User綁定相同id

    def __str__(self):
        return f"{self.id}-標題:{self.title}-創建日期:{self.created}"


# 購物車
class shopcart(models.Model):
    product_img = models.CharField(max_length=255)
    img_name = models.CharField(max_length=255)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    is_processed = models.BooleanField(default=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(
        "ordercart", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.id}-標題:{self.product_name}"


class ordercart(models.Model):
    ordernumber = models.CharField(max_length=255, null=True)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    buy_way = models.CharField(max_length=100, null=True)
    message_box = models.CharField(max_length=100, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}"
