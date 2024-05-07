from .models import PerfilUsuario
from rest_framework import viewsets, permissions
from .serializers import PerfilUsuarioSerializer





class PerfilUsuarioViewSet (viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer