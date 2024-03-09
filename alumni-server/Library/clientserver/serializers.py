from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


from django.contrib.auth.password_validation import validate_password
from .models import *
from django.contrib.auth import authenticate

import random
import string


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user_id','user', 'bloodGroup', 'contactNumber', 'profilePicture', 'city', 'state', 'country', 'pincode']


class RegisterSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=User.objects.all())]
    #         )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        characters = string.ascii_letters + string.digits
        length=10 # Letters and digits
        password = ''.join(random.choice(characters) for _ in range(length))
        
        user.set_password("12345")
        print(password)
        user.save()

        return user
    


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user and user.is_active:
            data['user'] = user
        else:
            raise serializers.ValidationError("Invalid username or password")

        return data



class ExperianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['user_id','designation','companyName','FromDate','EndDate']



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user_id','bloodGroup','contactNumber','profilePicture','city','state','country','pincode']




class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certifications
        fields = ['user_id','credentialId', 'CertificateUrl', 'certificate', 'skill', 'organisationName', 'description', 'dateOfCertification']
        extra_kwargs = {'user': {'read_only': True}}  # Make the user field read-only

    def create(self, validated_data):
        user = self.context['request'].user  # Get the user from the request
        validated_data['user'] = user
        certification = Certifications.objects.create(**validated_data)
        return certification
    

class ChangePasswordSerializer(serializers.Serializer):
    one_time_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ChangeUserNameSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)


class SearchResultsSerializer(serializers.Serializer):
    certifications = CertificationsSerializer(many=True)
    experiences = ExperianceSerializer(many=True)
    profiles = UserProfileSerializer(many=True)
    users = serializers.ListField(child=serializers.CharField(), allow_empty=True)


# serializers.py
from rest_framework import serializers
from .models import *

class PostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posting
        
        exclude = ['user']





