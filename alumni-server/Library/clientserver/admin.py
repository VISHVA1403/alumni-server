from django.contrib import admin

# Register your models here.
from . import models


admin.site.register(models.UserProfile)
admin.site.register(models.Experience)
admin.site.register(models.Posting)
admin.site.register(models.Certifications)

admin.site.register(models.Follow)