from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=15)
    password = serializers.CharField(max_length=255)

class OTPSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)


class PersonalInfoSerializer(serializers.Serializer):
    city_id = serializers.IntegerField()


