# Generated by Django 5.1.1 on 2024-09-25 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backAdmin', '0011_alter_article_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visits', models.IntegerField(default=0)),
                ('bio', models.CharField(default='', max_length=10000)),
            ],
        ),
    ]
