"""
URL configuration for Library project.

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
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from clientserver.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('alumni/register/', RegisterAPIView.as_view(), name='auth_register'),
    path('alumni/login/', LoginAPIView.as_view(), name='auth_login'),
    path('alumni/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('alumni/change-username/', ChangeUserName.as_view(), name='change-username'),
    path('alumni/userid/<int:user_id>/', GetUsernameByUserId.as_view(), name='get-username'),

    path('alumni/profile/',ProfileAPIView.as_view(),name = 'CreteProfile'),
    path('alumni/profiles/<str:username>/', othersProfile.as_view(), name='profile-detail'),
    path('alumni/profiles/<int:user_id>/', UserProfileView.as_view(), name='user-profile'),



    # path('alumni/profile/experiance/',ExperienceAPIView.as_view(),name = 'CreteExperiance'),
    # # path('alumni/profile/experiance_list/',ExperianceListAPIView.as_view(),name='ListExperiance'),

    path('alumni/experiences/', ExperienceAPIView.as_view(), name='experience-list'),
    path('alumni/experiences/<str:username>/', ExperienceAPIView.as_view(), name='experience-detail'),

    path('alumni/certifications/', CertificationsAPIView.as_view(), name='certification-list'),
    path('alumni/certifications/<str:username>/', CertificationsAPIView.as_view(), name='certification-detail'),


    path('alumni/search/', SearchAPIView.as_view(), name='search'),
    # path('alumni/search/', SearchView.as_view(), name='search'),


    path('postings/', PostingList.as_view(), name='posting-list'),
    path('postings/<int:pk>/', PostingDetail.as_view(), name='posting-detail'),


  
    # path('community/', include('communitychat.urls')),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
