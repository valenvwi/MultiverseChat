from django.contrib.auth import get_user_model
from django.db import models


class Chatroom(models.Model):
    owner_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="owner_id")
    participant_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="participant_id")
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    chatroom = models.ForeignKey(Chatroom, on_delete=models.CASCADE, related_name="message")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
