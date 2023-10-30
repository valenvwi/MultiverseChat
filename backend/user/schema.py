from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializers import UserProfileSerializer

user_list_docs = extend_schema(
    responses=UserProfileSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="Native Language",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Search user by native language",
        ),
        OpenApiParameter(
            name="Target Language",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Search user by target language",
        ),
    ]
)
