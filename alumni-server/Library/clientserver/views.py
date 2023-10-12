from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth.models import User


from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterAPIView(APIView):


    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }, status=status.HTTP_201_CREATED)



class LoginAPIView(APIView):
    
    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Both username and password are required'}, status=HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({'error': 'Invalid password'}, status=HTTP_400_BAD_REQUEST)


        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)



        return Response({
            'access_token': access_token,
            'refresh_token': str(refresh)
        })
