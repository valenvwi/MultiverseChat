from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from chat.consumer import ChatConsumer
from user.views import (UserProfileViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogOutAPIView,
    RegisterView
)
from chat.views import ChatroomViewSet, MessageViewSet

router = DefaultRouter()
router.register("api/users", UserProfileViewSet)
router.register("api/chatrooms", ChatroomViewSet, basename="chatroom")
router.register("api/messages", MessageViewSet, basename="message")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogOutAPIView.as_view(), name="logout"),
    path("api/register/", RegisterView.as_view(), name="register"),
] + router.urls

websocket_urlpatterns = [path("<str:chatroomId>/", ChatConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
