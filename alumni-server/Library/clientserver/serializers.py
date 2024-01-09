from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


from django.contrib.auth.password_validation import validate_password
from .models import Certifications,Experience,UserProfile,Posting,Skillset
from django.contrib.auth import authenticate




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
        fields = ['designation','sector','companyName','FromDate','EndDate']



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bloodGroup','contactNumber','profilePicture','city','state','country','pincode']


class SkillsetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skillset
        fields = ['skill','level']

class CertificationsSerializer(serializers.ModelSerializer):
    skill = SkillsetSerializer()
    class Meta:
        model = Certifications
        fields = ['credentialId','CertificateUrl','certificate','organizationName','description','dateOfCertification']

import random
import string


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'bloodGroup', 'contactNumber', 'profilePicture', 'city', 'state', 'country', 'pincode']


class RegisterSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=User.objects.all())]
    #         )

    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username','password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'username' : {'required':False},
            'password' : {'required':False},
            'password2' : {'required': False}
        }

    

    def create(self, validated_data):
        user = User.objects.create(
            username="default",
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            #  is_active=False
        )

        characters = string.ascii_letters + string.digits
        length=5 # Letters and digits
        password = ''.join(random.choice(characters) for _ in range(length))
        print(password)
        password="12345"
        user.set_password(password)
        user.save()

        return user
    


class ChangePasswordSerializer(serializers.Serializer):
    one_time_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
class ChangeUserNameSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)