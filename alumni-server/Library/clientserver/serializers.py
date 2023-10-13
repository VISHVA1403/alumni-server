from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)

    def validate(self, data):
        password1 = data.get('password')
        password2 = data.get('password2')

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    

