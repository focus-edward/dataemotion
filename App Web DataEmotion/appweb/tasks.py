from celery import shared_task
from .views import cargar_y_analizar_csv

@shared_task
def tarea_procesar_csv(archivo_path):
    resultados = cargar_y_analizar_csv(archivo_path)
    return resultados