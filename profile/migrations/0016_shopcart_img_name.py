# Generated by Django 4.2.4 on 2023-10-27 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0015_shopcart_product_img"),
    ]

    operations = [
        migrations.AddField(
            model_name="shopcart",
            name="img_name",
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
