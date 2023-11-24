# Generated by Django 4.2.4 on 2023-11-07 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0016_shopcart_img_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="ordercart",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ordernumber", models.CharField(max_length=255)),
                ("totalPrice", models.DecimalField(decimal_places=1, max_digits=10)),
                ("buy_way", models.CharField(max_length=100)),
                ("message_box", models.CharField(max_length=100)),
            ],
        ),
    ]
