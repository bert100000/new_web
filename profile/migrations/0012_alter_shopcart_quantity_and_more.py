# Generated by Django 4.2.4 on 2023-10-26 02:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0011_shopcart_related_profile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shopcart",
            name="quantity",
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name="shopcart",
            name="related_profile",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="profile.profile",
            ),
        ),
    ]
