from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


from django.contrib.auth.password_validation import validate_password
from .models import Certifications,Experience,UserProfile,Posting,Skillset
from django.contrib.auth import authenticate



class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
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
        fields = '__all__'



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bloodGroup','contactNumber','profilePicture','city','state','country','pincode']


class SkillsetSerializer(serializers.ModelSerializer):
    userProfile = ProfileSerializer()
    class Meta:
        model = Skillset
        fields = '__all__'

class CertificationsSerializer(serializers.ModelSerializer):
    skill = SkillsetSerializer()
    class Meta:
        model = Certifications
        fields = '__all__'
