"""
Django settings for tabibi_dz project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os  # Import for environment variables (if used)

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent
# Build paths inside the project like this: BASE_DIR / 'subdir'.


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-%ox1+92w$z_1=ty98%fh&0ym_doi#((eo2)i(-@$k6k)5hyp0r'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True



# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'dz_auth.apps.CustomAuthConfig',
    
    'rest_framework.authtoken',
    'corsheaders',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'

]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
              'DIRS': [
            BASE_DIR / 'templates',  # Make sure your 'templates' directory is included
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ROOT_URLCONF = 'tabibi_dz.urls'


import os
from dotenv import load_dotenv
load_dotenv()

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

WSGI_APPLICATION = 'tabibi_dz.wsgi.application'
<<<<<<< HEAD
EMAIL_PORT = 587  
=======
EMAIL_PORT = 587 
>>>>>>> 403676c8b27c6a22bf4eaf64872c5c9d742c71b9
EMAIL_HOST = 'smtp.gmail.com'       # Default to port 587 for TLS
EMAIL_USE_TLS = 'True'  # Use TLS (True/False)
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')          # SMTP email account
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')  # SMTP email password

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  #  engine
        'NAME': os.getenv('DB_NAME'),          # Database name
        'USER': os.getenv('DB_USER'),          # Database user
        'PASSWORD': os.getenv('DB_PASSWORD'),  # Database password
        'HOST': os.getenv('DB_HOST', 'localhost'),  # Database host (default: localhost)
        'PORT': os.getenv('DB_PORT', '3306'),       # Database port (default: 3306)
    },
    'sqlite': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
    
}

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
DATABASE_ROUTERS = ['dz_auth.routers.SQLiteRouter']
SESSION_COOKIE_AGE = 3600
REST_FRAMEWORK = {

'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
                'rest_framework_simplejwt.authentication.JWTAuthentication',

    ),


    
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators



# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_URL='media/'
MEDIA_ROOT=os.path.join(BASE_DIR, 'media')
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field



<<<<<<< HEAD
import firebase_admin
from firebase_admin import credentials, storage

# Path to your service account JSON
FIREBASE_CREDENTIALS = './firebase_service_account.json'
FIREBASE_STORAGE_BUCKET = 'your-app-id.appspot.com'

# Initialize Firebase if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred, {'storageBucket': FIREBASE_STORAGE_BUCKET})
=======
# settings.py
WHEREBY_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzM1NTg0NjM4LCJvcmdhbml6YXRpb25JZCI6MzAxMDY5LCJqdGkiOiI3NTI0NjE0ZS1iMTQ2LTQwNjYtOWZhYS1mZmI1YTU4NDM0ZGUifQ.dLi4gLtbvAr3aAGqRNhXOFt2PBEEehfUSq87OHbcFcs'
>>>>>>> 403676c8b27c6a22bf4eaf64872c5c9d742c71b9
