# Generated by Django 5.1.1 on 2024-10-02 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_profile_nightmode'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='default-avatar.jpg', null=True, upload_to=''),
        ),
    ]
