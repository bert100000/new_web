# Generated by Django 4.2.4 on 2023-10-19 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0002_profile_attack_profile_defence_profile_lucky_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="equipName",
            field=models.CharField(max_length=30, null=True),
        ),
    ]
