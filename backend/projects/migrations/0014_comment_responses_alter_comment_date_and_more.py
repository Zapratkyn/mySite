# Generated by Django 5.1.1 on 2024-09-23 13:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0013_comment_edited'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='responses',
            field=models.ManyToManyField(related_name='responses', to='projects.comment'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 23, 13, 17, 18, 230465, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='project',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 23, 13, 17, 18, 231208, tzinfo=datetime.timezone.utc)),
        ),
    ]
