from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    UserProfileSerializer,
    CustomTokenObtainPairSerializer,
    JWTCookieTokenRefreshSerializer,
    RegisterSerializer,
)
from .models import UserProfile, User
from .schema import user_list_docs


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
        print("Log out response", response)

        response.set_cookie("refresh_token", "", expires=0)
        response.set_cookie("access_token", "", expires=0)

        return response


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


    @user_list_docs
    def list(self, request):
        nativeLanguage = request.query_params.get("native_language")
        print("nativeLanguage", nativeLanguage)
        targetLanguage = request.query_params.get("target_language")

        if nativeLanguage:
            # Add the filter later for user that already have chatroom with the current user
            try:
                self.queryset = self.queryset.filter(native_language=nativeLanguage.capitalize(), active=True)
                self.queryset = self.queryset.exclude(user=request.user)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Users with nativeLanguage {nativeLanguage} not found")
            except ValueError:
                raise ValidationError(detail="User value error")

        if targetLanguage:
            try:
                self.queryset = self.queryset.filter(target_language=targetLanguage.capitalize())
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Users with target language {targetLanguage} not found")
            except ValueError:
                raise ValidationError(detail="User value error")

        serializer = UserProfileSerializer(self.queryset, many=True)
        return Response(serializer.data)


    def create(self, request, format=None):
        user = request.user  # Get the authenticated user
        print("user", user)

        data = {
        'user': user.id,
        'first_name': request.data.get('first_name'),
        'last_name': request.data.get('last_name'),
        'avatar': request.data.get('avatar'),  # Make sure this is a valid file
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
        print("Data in JWTSetCookieMixin: ",response.data)
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

        print("Final response: ", response)

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = JWTCookieTokenRefreshSerializer
