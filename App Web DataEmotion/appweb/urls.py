from rest_framework import routers
from appweb import api
from django.urls import path, include
from .views import RegisterView, LoginView, cargar_y_analizar_csv

router = routers.DefaultRouter()

router.register(r'appweb',api.PerfilUsuarioViewSet, 'appweb')


urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('cargar_y_analizar_csv/', cargar_y_analizar_csv, name='cargar_y_analizar_csv'),
]