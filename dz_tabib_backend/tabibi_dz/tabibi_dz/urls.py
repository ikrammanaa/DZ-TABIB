"""
URL configuration for tabibi_dz project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path

urlpatterns = [
<<<<<<< HEAD
    path('', include('dz_auth.urls'))
=======
    path('', include('dz_auth.urls')),
    path('', include('appointments.urls'))
>>>>>>> 403676c8b27c6a22bf4eaf64872c5c9d742c71b9



]
