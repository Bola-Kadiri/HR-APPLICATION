import os
from pathlib import Path
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-pb8mrkrm0iy^a^=2v(nbfg*q8c43g-=!5uf%-zp2id$udq4hn_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Adjust this for production


# Application definition

DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB limit

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'job',
    'application',
    'user_authentication', 
    'corsheaders',  # Ensure corsheaders is included
    'rest_framework',
    'rest_framework_simplejwt',
    'djoser',
    'django_extensions',
    

]


REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
   'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Place corsheaders middleware at the top
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Ensure no trailing slash or extra whitespace
]

ROOT_URLCONF = 'backend_app.urls'

AUTH_USER_MODEL = 'user_authentication.UserAccount'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
         'DIRS': [
            os.path.join(BASE_DIR, 'frontend', 'build'),
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


WSGI_APPLICATION = 'backend_app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'new-hr',
        'USER': 'postgres',
        'PASSWORD': '1511',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}




# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'  # URL for serving static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Directory where collectstatic will store static files




DJOSER ={
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION':True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
   'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create': 'user_authentication.serializers.UserCreateSerializer',
        'user': 'user_authentication.serializers.UserCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer'
        
    }
}

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

FRONTEND_URL = "http://localhost:5173"


# Email settings for Office 365 (commented out as placeholders)
# EMAIL_BACKEND = 'django_o365mail.EmailBackend'

# O365 credentials
# O365_MAIL_CLIENT_ID = 'kadiri.jimoh@alphamead.com'  
# O365_MAIL_CLIENT_SECRET = 'Newlander1511@'  
# O365_MAIL_TENANT_ID = '0a3dc025-506a-4075-a7f9-7aad2176ea3e'

# Optional configurations for additional email setup
# O365_MAIL_ACCOUNT_KWARGS = {
#     'token_backend': 'O365.utils.token.EnvTokenBackend',
# }

# O365_MAIL_MAILBOX_KWARGS = {
#     'resource': 'o365mailbox@domain.com',
# }

# Use your custom authentication backend
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Default backend for other use cases
]

# Ensure to allow less secure apps or set up an App Password for Gmail
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Gmail SMTP server configuration
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = 'bolajimoh25@gmail.com'
EMAIL_HOST_PASSWORD = 'kagc suww ghaj djyr'  # Replace with your Gmail App Password
DEFAULT_FROM_EMAIL = 'bolajimoh25@gmail.com'

