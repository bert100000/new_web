# Generated by Django 4.2.4 on 2023-10-26 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0013_remove_shopcart_related_profile_shopcart_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="finalImgPath",
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
