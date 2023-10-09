from django.db import models
from django.contrib.auth.models import User


class Certifications(models.Model):
    credentialId=models.CharField(max_length=126,blank=True,null=True)
    CertificateUrl=models.CharField(max_length=512,blank=True,null=True)
    certificateImage=models.FileField(upload_to='uploads/certificates/',null=True)
    organisationName=models.CharField(max_length=256)
    description=models.TextField(max_length=1000)
    dateOfCertification=models.DateField()

class Skillset(models.Model):
    skill=models.CharField(max_length=256)
    level=models.CharField(max_length=32,blank=True,null=True)
    certificate=models.ForeignKey(Certifications,on_delete=models.CASCADE)

class Working(models.Model):
    designation=models.CharField(max_length=256,blank=True,null=True)
    sector=models.CharField(max_length=256,blank=True,null=True)
    tenure=models.IntegerField(max_length=3,blank=True,null=True)
    companyName=models.CharField(max_length=256,blank=True,null=True)
    joinedDate=models.DateTimeField(auto_now_add=False)

class Location(models.Model):
    city=models.CharField(max_length=256,null=True,blank=True)
    state=models.CharField(max_length=256,null=True,blank=True)
    country=models.CharField(max_length=256,null=True,blank=True)
    pincode=models.CharField(max_length=26,null=True,blank=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registerNumber=models.CharField(max_length=12,blank=True,null=True)
    bloodGroup=models.CharField(max_length=4,blank=True,null=True)
    contactNumber=models.CharField(max_length=20,null=True,blank=True)
    profilePicture=models.ImageField(upload_to='uploads/profile_pictures/')
    skillSet=models.ForeignKey(Skillset,on_delete=models.CASCADE)
    working=models.ForeignKey(Working,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    

class Posting(models.Model):
    pass




    






