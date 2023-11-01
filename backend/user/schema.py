from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializers import UserProfileSerializer

user_list_docs = extend_schema(
    responses=UserProfileSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="native_language",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Search user by native language",
        ),
        OpenApiParameter(
            name="target_language",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Search user by target language",
        ),
    ]
)
