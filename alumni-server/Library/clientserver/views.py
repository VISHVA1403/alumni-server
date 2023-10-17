from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, authentication, permissions

from .serializers import RegisterSerializer, LoginSerializer,ProfileSerializer,SkillsetSerializer,ExperianceSerializer,CertificationsSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token
from .models import *

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(generics.ListCreateAPIView):
    # queryset = UserProfile.objects.all()
    # serializer_class = ProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self,request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            serializer.instance = user
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except:
            return Response({"error":"No such profile exists"},status=HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data,status = status.HTTP_200_OK)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user =serializer.validated_data['user'] # type: ignore
            token,created =Token.objects.get_or_create(user=user)
            return Response(token.key  , status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    