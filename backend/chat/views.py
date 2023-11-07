from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Chatroom, Message
from .schemas import list_message_docs
from .serializers import MessageSerializer, ChatroomSerializer
from django.db.models import Q, Max
from user.models import User

class ChatroomViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        chatrooms = Chatroom.objects.filter(Q(owner=user) | Q(participant=user)).annotate(
            last_message_timestamp=Max('message__timestamp')
        )
        chatrooms = chatrooms.order_by('-last_message_timestamp')
        serializer = ChatroomSerializer(chatrooms, many=True)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        participant_id = request.data.get("participant")
        participant = User.objects.get(id=participant_id)

        if participant == user:
            return Response({"detail": "You cannot create a chatroom with yourself."}, status=400)

        try:
            chatroom = Chatroom.objects.get(owner=user, participant=participant)
            serializer = ChatroomSerializer(chatroom)
            return Response(serializer.data)
        except Chatroom.DoesNotExist:
            chatroom = Chatroom.objects.create(owner=user, participant=participant)
            serializer = ChatroomSerializer(chatroom)
            return Response(serializer.data)


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        chatroom_id = request.query_params.get("chatroom_id")

        try:
            chatroom = Chatroom.objects.get(id=chatroom_id)
            message = chatroom.message.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Chatroom.DoesNotExist:
            return Response([])
