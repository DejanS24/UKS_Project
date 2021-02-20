# Generated by Django 3.0.2 on 2021-02-19 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uks_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='labels',
            field=models.ManyToManyField(blank=True, to='uks_app.Label'),
        ),
        migrations.AlterField(
            model_name='issue',
            name='related_issues',
            field=models.ManyToManyField(blank=True, related_name='_issue_related_issues_+', to='uks_app.Issue'),
        ),
    ]
