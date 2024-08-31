# Generated by Django 5.1 on 2024-08-31 11:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=100)),
                ('description', models.CharField(default='', max_length=1000)),
                ('authorId', models.IntegerField(default=0)),
                ('accepted', models.BooleanField(default=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='suggestionAuthor', to='profiles.profile')),
            ],
        ),
    ]
