from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Chatroom, Message
from .schemas import list_message_docs
from .serializers import MessageSerializer, ChatroomSerializer
from django.db.models import Q
from user.models import User

class ChatroomViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        chatrooms = Chatroom.objects.filter(Q(owner=user) | Q(participant=user))
        serializer = ChatroomSerializer(chatrooms, many=True)
        print("Response: ", serializer.data)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        participant_id = request.data.get("participant")
        participant = User.objects.get(id=participant_id)
        print("participant: ", participant)
        print("user: ", user)

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

    # def destroy(self, request, pk=None):
    #     user = request.user
    #     chatroom = Chatroom.objects.get(id=pk, owner=user)
    #     chatroom.delete()
    #     return Response({"detail": "Chatroom deleted."}, status=204)

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


    # def create(self, request):
    #     chatroom_id = request.data.get("chatroom_id")
    #     chatroom = Chatroom.objects.get(id=chatroom_id)
    #     content = request.data.get("content")
    #     sender = request.user

    #     try:
    #         message = Message.objects.create(chatroom=chatroom, content=content, sender=sender)
    #         serializer = MessageSerializer(message)
    #         return Response(serializer.data)
    #     except Chatroom.DoesNotExist:
    #         return Response({"detail": "Chatroom does not exist."}, status=400)
