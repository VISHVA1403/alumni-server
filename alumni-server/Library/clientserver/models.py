from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bloodGroup=models.CharField(max_length=4,blank=True,null=True)
    contactNumber=models.CharField(max_length=20,null=True,blank=True)
    profilePicture=models.ImageField(upload_to='uploads/profile_pictures/')
    city=models.CharField(max_length=256,null=True,blank=True)
    state=models.CharField(max_length=256,null=True,blank=True)
    country=models.CharField(max_length=256,null=True,blank=True)
    pincode=models.CharField(max_length=26,null=True,blank=True)
    def __str__(self):
        return self.user.username
    
class Experience(models.Model):
    userProfile = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    designation=models.CharField(max_length=256,blank=True,null=True)
    sector=models.CharField(max_length=256,blank=True,null=True)
    tenure=models.IntegerField(blank=True,null=True)
    companyName=models.CharField(max_length=256,blank=True,null=True)
    FromDate=models.DateField(auto_now_add=False)
    EndDate = models.DateField(auto_now_add=False)

class Skillset(models.Model):
    userProfile = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    skill=models.CharField(max_length=256)
    level=models.CharField(max_length=32,blank=True,null=True)
    def __str__ (self):
        return self.skill

class Certifications(models.Model):
    skill = models.ForeignKey(Skillset,on_delete=models.CASCADE)
    credentialId=models.CharField(max_length=126,blank=True,null=True)
    CertificateUrl=models.CharField(max_length=512,blank=True,null=True)
    certificateImage=models.FileField(upload_to='uploads/certificates/',null=True)
    organisationName=models.CharField(max_length=256)
    description=models.TextField(max_length=1000)
    dateOfCertification=models.DateField()




class Posting(models.Model):
    pass