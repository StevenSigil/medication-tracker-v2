from django.contrib.auth import get_user_model, logout, login
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from . import serializers
from .utils import get_and_authenticate_user, create_user_accont

User = get_user_model()


class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers.EmptySerializer
    serializer_classes = {
        'login': serializers.UserLoginSerializer,
        'register': serializers.UserRegisterSerializer,
        'password_change': serializers.PasswordChangeSerializer,
    }

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        """
        Allows a user to login by checking the serializer, then attempting to authenticate via the get_and_auth. util.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        login(request, user)
        data = serializers.AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST', ], detail=False)
    def register(self, request):
        """
        Allows a new user to register for the site. Passes data to serializer for validation, then to util func. for
        creation, (then to util func. for authentication) before returning the user's data in the response.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user_accont(**serializer.validated_data)
        # user = get_and_authenticate_user(user.email, user.password)
        data = serializers.AuthUserSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def logout(self, request):
        """
        Performs a logout on the user instance. Returns a simple message.
        No serializer is declared, falls back to the EmptySerializer.
        """
        print(request.user.is_anonymous)
        logout(request)
        print(request.user.is_anonymous)
        data = {'success': 'Successfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def password_change(self, request):
        """
        Validates current and new password request (via serializer) and if valid, saves the User instance with the
        new password.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_202_ACCEPTED)

    def get_serializer_class(self):
        """
        Allows for more than a single serializer instance for this GenericViewSet via the serializer_classes dict.
        """
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
