from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Chatroom, Message

User = get_user_model()

# https://channels.readthedocs.io/en/stable/topics/consumers.html
class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chatroom = None

    def connect(self):
        self.user = self.scope["user"]
        print("User: ", self.user)
        self.accept()

        if not self.user.is_authenticated:
            self.close(code=4001)

        self.chatroom_id = self.scope["url_route"]["kwargs"]["chatroomId"]
        print("Chatroom id: ", self.chatroom_id)

        try:
            self.chatroom = Chatroom.objects.get(id=self.chatroom_id)
        except Chatroom.DoesNotExist:
            self.close(code=4002)

        async_to_sync(self.channel_layer.group_add)(self.chatroom_id, self.channel_name)

    def receive_json(self, content):
        sender = self.user

        print("Content: ", content)
        print("Sender: ", sender)
        message_content = content["content"]

        message = Message.objects.create(chatroom=self.chatroom, sender=sender, content=message_content)

        async_to_sync(self.channel_layer.group_send)(
            str(self.chatroom_id),
            {
                "type": "chat.message",
                "new_message": {
                    "id": message.id,
                    "sender": message.sender.id,
                    "content": message.content,
                    "timestamp": message.timestamp.isoformat(),
                },
            },
        )
    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        if self.chatroom:
            async_to_sync(self.channel_layer.group_discard)(str(self.chatroom_id, self.channel_name))
        super().disconnect(close_code)
