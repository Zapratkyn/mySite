# Generated by Django 5.1.1 on 2024-09-13 15:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_remove_profile_chatchannelname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='online',
        ),
    ]
