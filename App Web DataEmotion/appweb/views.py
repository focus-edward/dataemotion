from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.decorators import api_view
import pandas as pd
import requests

@api_view(['POST'])
def cargar_y_analizar_csv(request):
    if request.method == 'POST':
        archivo = request.FILES.get('archivo')
        if not archivo:
            return Response({'error': 'No se ha proporcionado archivo.'}, status=status.HTTP_400_BAD_REQUEST)
        
        df = pd.read_csv(archivo)
        df.dropna(inplace=True)
        
        textos = df['text'].tolist()
        reactions = df['likes','comments','shares','reactions_count'].tolist()
        
        # Llamada a la API de Hugging Face para análisis de sentimientos
        sentimientos_api_url = "https://api-inference.huggingface.co/models/finiteautomata/beto-sentiment-analysis"
        sentimientos_headers = {"Authorization": f"Bearer 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"}
        
        # Llamada a la API de Hugging Face para análisis de emociones
        emociones_api_url = "https://api-inference.huggingface.co/models/finiteautomata/beto-emotion-analysis"
        emociones_headers = {"Authorization": f"Bearer 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"}
        
        def analizar_sentimiento(texto):
            response = requests.post(sentimientos_api_url, headers=sentimientos_headers, json={"inputs": texto})
            if response.status_code == 200:
                return response.json()[0]
            else:
                return {"error": "Error al procesar el texto para análisis de sentimientos"}
        
        def analizar_emocion(texto):
            response = requests.post(emociones_api_url, headers=emociones_headers, json={"inputs": texto})
            if response.status_code == 200:
                return response.json()[0]
            else:
                return {"error": "Error al procesar el texto para análisis de emociones"}
        
        df['sentimiento'] = [analizar_sentimiento(texto) for texto in textos]
        df['emocion'] = [analizar_emocion(texto) for texto in textos]
        
        resultados = df.to_dict(orient='records')
        return Response({'resultados': resultados}, status=status.HTTP_200_OK)





class RegisterView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful"})
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    






