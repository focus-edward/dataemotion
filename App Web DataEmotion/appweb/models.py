from django.db import models
from django.contrib.auth.models import User


class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombres = models.TextField(max_length=50, null=True)
    apellidos = models.TextField(max_length=50, null=True)
    edad = models.IntegerField(null=True)
    direccion = models.CharField(max_length=254,null=True)

    def __str__(self):
        return self.user.username  
