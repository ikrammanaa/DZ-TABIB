from django.urls import path
from .views import RegisterStep1View,VerifyOTPView,RegisterStep3View, RegisterStep4View,LoginAPIView

urlpatterns = [
    path('register/step1/', RegisterStep1View.as_view(), name='register_step1'),
    path('register/step2/', VerifyOTPView.as_view(), name='register_step2'),
    path('register/step3/', RegisterStep3View.as_view(), name='register_step3'),
    path('register/step4/', RegisterStep4View.as_view(), name='register_step4'),
    path('register/login/', LoginAPIView.as_view(), name='login'),




]