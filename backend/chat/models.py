from django.contrib.auth import get_user_model
from django.db import models


class Chatroom(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="owner", null=True)
    participant = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="participant", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'chat'


class Message(models.Model):
    chatroom = models.ForeignKey(Chatroom, on_delete=models.CASCADE, related_name="message")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'chat'
