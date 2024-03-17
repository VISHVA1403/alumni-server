from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, authentication, permissions

from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile 


from itertools import chain

from django.db.models import Q


from rest_framework.filters import SearchFilter,OrderingFilter

from django.core.mail import send_mail
from django.conf import settings


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

import random

class RegisterAPIView(APIView):
    def generate_unique_username(self,first_name, last_name):
        while True:
            # Extract the first letter from the first name and last name
            first_initial = first_name[random.randint(0,len(first_name)-1) ].lower()+first_name[random.randint(0,len(first_name)-1)].lower()
            last_initial = last_name[random.randint(0,len(last_name)-1)].lower()+last_name[random.randint(0,len(last_name)-1)].lower()


            random_digits = ''.join(str(random.randint(0, 9)) for _ in range(2))

            # Combine the components to create the username
            username = f"{first_initial}{last_initial}{random_digits}"

            # Check if the username is already in use
            if not User.objects.filter(username=username).exists():
                return username
            else:
                self.generate_unique_username(first_name,last_name)
            

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            user.username =self.generate_unique_username(user.first_name, user.last_name) # type: ignore
            if User.objects.filter(username=user.username).exists(): # type: ignore
                return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
            print(user.username) # type: ignore
            user.save() # type: ignore
            # subject = 'Your Login Credentials for Alumni app'
            # message = f'Dear {user.first_name},I hope this email finds you well. We are pleased to inform you that your account has been successfully created on Alumni app, and we are excited to have you as a part of our community..\n\nYour username: {user.username}\nYour password: "Selvakumar@1"\n\nPlease keep this information secure.'
            # from_email = settings.DEFAULT_FROM_EMAIL  
            # recipiesnt_list = [user.email]

            # send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            # print(message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user

            if not user.check_password(serializer.data.get('one_time_password')): # type: ignore
                return Response({'one_time_password': 'Wrong password'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.data.get('new_password')) # type: ignore
            user.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangeUserName(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangeUserNameSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            username = serializer.validated_data.get('username') # type: ignore

            # Check if the new username is available
            if User.objects.filter(username=username).exclude(pk=user.pk).exists():
                return Response({'username': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user.username = username
            user.save()
            return Response({'message': 'Username changed successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
class ProfileAPIView(generics.ListCreateAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            profile = UserProfile(user=user)

        serializer = ProfileSerializer(instance=profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(instance=profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        username=request.user
        if username:
            user = get_object_or_404(User, username=username)
        else:
            user = request.user

        try:
            profile = UserProfile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
class UserProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        return Response(data, status=status.HTTP_200_OK)
    
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user =serializer.validated_data['user'] # type: ignore
            token,created =Token.objects.get_or_create(user=user)
            return Response(token.key  , status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ExperienceAPIView(generics.ListCreateAPIView, generics.RetrieveDestroyAPIView):
    serializer_class = ExperianceSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        username_param = self.kwargs.get('username', None)
        if username_param:
            return Experience.objects.filter(user__username=username_param)
        return Experience.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        instance = get_object_or_404(Experience, id=kwargs['pk'])
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ExperianceListAPIView(generics.ListAPIView):
#     serializer_class = ExperianceSerializer
#     authentication_classes = [authentication.TokenAuthentication]
#     permission_classes = [permissions.IsAuthenticated]
#     def get_queryset(self):
#         return Experience.objects.filter(user__id=self.request.user.pk).order_by('-FromDate')
    


class CertificationsAPIView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Certifications.objects.all()
    serializer_class = CertificationsSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        username_param = self.kwargs.get('username', None)
        return Certifications.objects.filter(user__username=username_param) if username_param else Certifications.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'status': 'success', 'message': 'Certification created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (SearchFilter,OrderingFilter)
    ordering_fields = ['username', 'email']
    ordering = ['username']

from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework import generics, authentication, permissions
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from .models import Certifications, Experience, UserProfile
from .serializers import CertificationsSerializer, ExperianceSerializer, UserProfileSerializer, SearchResultsSerializer

class SearchAPIView(generics.ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        
        # Search in Certifications model
        certifications = Certifications.objects.filter(
            Q(skill__icontains=query) |
            Q(credentialId__icontains=query) |
            Q(organisationName__icontains=query) |
            Q(description__icontains=query)
        )

        # Search in Experience model
        experiences = Experience.objects.filter(
            Q(designation__icontains=query) |
            Q(companyName__icontains=query)
        )

        # Search in UserProfile model
        profiles = UserProfile.objects.filter(
            Q(bloodGroup__icontains=query) |
            Q(contactNumber__icontains=query) |
            Q(city__icontains=query) |
            Q(state__icontains=query) |
            Q(country__icontains=query)
        )

        # Search in User model (username-based search)
        users = User.objects.filter(username__icontains=query)

        # Serialize Certifications queryset
        certifications_serializer = CertificationsSerializer(certifications, many=True)

        # Include both usernames and user_ids in the response
        users_data = [{'username': user.username, 'user_id': user.id} for user in users]

        return {
            'certifications': certifications_serializer.data,
            'experiences': experiences,
            'profiles': profiles,
            'users': users_data,
        }

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Return the combined results
        search_serializer = SearchResultsSerializer(queryset)
        return Response(search_serializer.data)






class othersProfile(generics.ListCreateAPIView):
        def get(self, request,username):
            username=username
            if username:
                user = get_object_or_404(User, username=username)
            else:
                user = request.user

            try:
                profile = UserProfile.objects.get(user=user)
                serializer = ProfileSerializer(profile)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except UserProfile.DoesNotExist:
                return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
            

class PostingList(generics.ListCreateAPIView):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

class PostingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]


 # Make sure to import the UserProfile model

class GetUsernameByUserId(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user_profile = UserProfile.objects.get(user=user)  # Assuming UserProfile has a ForeignKey to User
            username = user.username
           
            response_data = {
                'user_id': user_id,
                'username': username,
                'profile_picture': user_profile.profilePicture.url,  # Assuming profilePicture is an ImageField
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)



