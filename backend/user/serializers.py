from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from .models import User, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_id(self, obj):
        return obj.id



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)

        if valid:
            username = self.validated_data["username"]
            email = self.validated_data["email"]
            if User.objects.filter(username=username).exists():
                self._errors["username"] = ["Username already exists"]
                valid = False
            if User.objects.filter(email=email).exists():
                self._errors["email"] = ["Email already exists"]
                valid = False

        return valid

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        print("Data in customtokenobtainpairserializer: ", data)
        return data


class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            print("attrs in jwttokenrefreshserializer: ", attrs)
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")
