from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from user.views import (UserProfileViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogOutAPIView,
    RegisterView
)

router = DefaultRouter()
router.register("api/users", UserProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogOutAPIView.as_view(), name="logout"),
    path("api/register/", RegisterView.as_view(), name="register"),
] + router.urls


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
