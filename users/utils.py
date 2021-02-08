from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers


def get_and_authenticate_user(email, password):
    """
    Returns a CustomUser obj if the email/password credentials exist.
    """
    user = authenticate(username=email, password=password)
    if not user:
        raise serializers.ValidationError(
            {'email': ['Invalid email or password'], 'password': ['Invalid email or password']})
    return user


def create_user_accont(email, password, first_name="", last_name="", **extra_fields):
    """
    After validating the request, this function creates the user instance with provided/validated credentials.
    """
    user = get_user_model().objects.create_user(email=email, password=password, first_name=first_name,
                                                last_name=last_name, **extra_fields)
    return user
