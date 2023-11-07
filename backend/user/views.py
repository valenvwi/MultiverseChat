from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import OuterRef, Subquery
from django.db.models import BooleanField, Q


from .serializers import (
    UserProfileSerializer,
    CustomTokenObtainPairSerializer,
    JWTCookieTokenRefreshSerializer,
    RegisterSerializer,
)
from .models import UserProfile, User
from .schema import user_list_docs
from chat.models import Chatroom


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]

            forbidden_usernames = ["admin", "root", "superuser"]
            if username is forbidden_usernames:
                return Response({"error": "Username not allowed"}, status=status.HTTP_409_CONFLICT)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        errors = serializer.errors
        if "username" in errors and "non_field_errors" not in errors:
            return Response({"error": "Username already exists"}, status=status.HTTP_409_CONFLICT)

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutAPIView(APIView):
    def post(self, request, format=None):
        response = Response("Logged out successfully")

        response.set_cookie("refresh_token", "", expires=0)
        response.set_cookie("access_token", "", expires=0)

        return response


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


    @user_list_docs
    def list(self, request):
        nativeLanguage = request.query_params.get("native_language")
        targetLanguage = request.query_params.get("target_language")

        if nativeLanguage:
            try:
                chatroom_exists = Chatroom.objects.filter(
                    Q(owner=OuterRef("user"), participant=request.user) |
                    Q(participant=OuterRef("user"), owner=request.user)
                )
                self.queryset = self.queryset.filter(native_language=nativeLanguage.capitalize())
                self.queryset = self.queryset.annotate(has_chatroom=Subquery(chatroom_exists.values("id")[:1], output_field=BooleanField()))
                exclude_condition = Q(has_chatroom=False) | Q(has_chatroom=None)
                self.queryset = self.queryset.filter(exclude_condition)

                if not self.queryset.exists():
                    raise ValidationError(detail=f"Users with nativeLanguage {nativeLanguage} not found")
            except ValueError:
                raise ValidationError(detail="User value error")

        if targetLanguage:
            try:
                chatroom_exists = Chatroom.objects.filter(
                    Q(owner=OuterRef("user"), participant=request.user) |
                    Q(participant=OuterRef("user"), owner=request.user)
                )
                self.queryset = self.queryset.filter(target_language=targetLanguage.capitalize())
                self.queryset = self.queryset.annotate(has_chatroom=Subquery(chatroom_exists.values("id")[:1], output_field=BooleanField()))
                exclude_condition = Q(has_chatroom=False) | Q(has_chatroom=None)
                self.queryset = self.queryset.filter(exclude_condition)

                if not self.queryset.exists():
                    raise ValidationError(detail=f"Users with target language {targetLanguage} not found")
            except ValueError:
                raise ValidationError(detail="User value error")

        serializer = UserProfileSerializer(self.queryset, many=True)
        return Response(serializer.data)


    def create(self, request, format=None):
        user = request.user

        data = {
        'user': user.id,
        'first_name': request.data.get('first_name'),
        'last_name': request.data.get('last_name'),
        'avatar': request.data.get('avatar'),
        'location': request.data.get('location'),
        'bio': request.data.get('bio'),
        'native_language': request.data.get('native_language'),
        'target_language': request.data.get('target_language'),
        }
        serializer = UserProfileSerializer(data=data)

        if serializer.is_valid():
            user_profile = UserProfile.objects.create(**serializer.validated_data)
            user_profile.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = JWTCookieTokenRefreshSerializer
