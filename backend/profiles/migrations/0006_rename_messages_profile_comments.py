# Generated by Django 5.1.1 on 2024-09-23 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_remove_profile_nbofmessages_profile_messages'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='messages',
            new_name='comments',
        ),
    ]
