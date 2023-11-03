from rest_framework import serializers

from .models import Chatroom, Message
from user.serializers import UserSerializer

class ChatroomSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    participant = UserSerializer()
    
    class Meta:
        model = Chatroom
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
