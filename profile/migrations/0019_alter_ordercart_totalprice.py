# Generated by Django 4.2.4 on 2023-11-07 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "profile",
            "0018_alter_ordercart_buy_way_alter_ordercart_message_box_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="ordercart",
            name="totalPrice",
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
