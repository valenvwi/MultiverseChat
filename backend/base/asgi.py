import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')


# https://channels.readthedocs.io/en/latest/installation.html

django_application = get_asgi_application()

from . import urls  # noqa isort:skip
from chat.middleware import JWTAuthMiddleWare

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleWare(URLRouter(urls.websocket_urlpatterns)),
    }
)
