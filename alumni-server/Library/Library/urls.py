from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


from clientserver.views import RegisterView,CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('alumni/register/', RegisterView.as_view(), name='auth_register'),
    path('alumni/login/', CustomAuthToken.as_view(), name='auth_login'),
<<<<<<< HEAD
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
>>>>>>> 248ea100195fc993f726215f943f7fff3b3b266c
