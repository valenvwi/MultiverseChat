# Generated by Django 4.2.6 on 2023-11-02 12:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='conversation',
            new_name='chatroom',
        ),
        migrations.RemoveField(
            model_name='chatroom',
            name='owner_id',
        ),
        migrations.RemoveField(
            model_name='chatroom',
            name='participant_id',
        ),
        migrations.AddField(
            model_name='chatroom',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='participant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='participant', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]