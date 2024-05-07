from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PerfilUsuario



class PerfilUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilUsuario
        fields = ['nombres', 'apellidos', 'edad', 'direccion']

class UserSerializer(serializers.ModelSerializer):
    perfil_usuario = PerfilUsuarioSerializer(required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'perfil_usuario']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        perfil_data = validated_data.pop('perfil_usuario')
        user = User.objects.create_user(**validated_data)
        PerfilUsuario.objects.create(user=user, **perfil_data)
        return user