# Generated by Django 4.2.4 on 2023-10-20 02:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profile", "0003_profile_equipname"),
    ]

    operations = [
        migrations.RenameField(
            model_name="profile",
            old_name="power1",
            new_name="value1",
        ),
        migrations.RenameField(
            model_name="profile",
            old_name="power2",
            new_name="value2",
        ),
        migrations.RenameField(
            model_name="profile",
            old_name="power3",
            new_name="value3",
        ),
    ]