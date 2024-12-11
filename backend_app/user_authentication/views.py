# views.py
from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .serializers import UserSerializer
from .models import User

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # Deactivate account until email confirmation
            user.save()
            
            # Send email verification (simplified for the example)
            send_mail(
                "Activate Your Account",
                f"Please click the following link to verify your email: /verify/{user.id}",
                'from@example.com',
                [user.email],
            )
            return Response({"detail": "Registration successful. Please check your email for verification."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_active = True  # Activate the user upon email verification
            user.save()
            return Response({"detail": "Email verified successfully!"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)


class ChangeRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, user_id):
        if request.user.role != 'admin':
            return Response({"detail": "Permission denied. Only admins can change roles."}, status=status.HTTP_403_FORBIDDEN)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        new_role = request.data.get('role')
        if new_role not in ['admin', 'executive']:
            return Response({"detail": "Invalid role. Only 'admin' or 'executive' roles can be assigned."}, status=status.HTTP_400_BAD_REQUEST)

        user.role = new_role
        user.save()
        return Response({"detail": f"User's role has been updated to {new_role}."}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(user.pk.encode())

        # Send reset email (simplified)
        send_mail(
            "Password Reset",
            f"Please click the following link to reset your password: /reset/{uid}/{token}",
            'from@example.com',
            [user.email],
        )
        return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)



