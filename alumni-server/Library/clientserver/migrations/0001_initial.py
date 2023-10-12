# Generated by Django 4.2.4 on 2023-10-12 05:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Certifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credentialId', models.CharField(blank=True, max_length=126, null=True)),
                ('CertificateUrl', models.CharField(blank=True, max_length=512, null=True)),
                ('certificateImage', models.FileField(null=True, upload_to='uploads/certificates/')),
                ('organisationName', models.CharField(max_length=256)),
                ('description', models.TextField(max_length=1000)),
                ('dateOfCertification', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='CurrentWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(blank=True, max_length=256, null=True)),
                ('sector', models.CharField(blank=True, max_length=256, null=True)),
                ('tenure', models.IntegerField(blank=True, max_length=3, null=True)),
                ('companyName', models.CharField(blank=True, max_length=256, null=True)),
                ('joinedDate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(blank=True, max_length=256, null=True)),
                ('state', models.CharField(blank=True, max_length=256, null=True)),
                ('country', models.CharField(blank=True, max_length=256, null=True)),
                ('pincode', models.CharField(blank=True, max_length=26, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Posting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Skillset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(max_length=256)),
                ('level', models.CharField(blank=True, max_length=32, null=True)),
                ('certificate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientserver.certifications')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registerNumber', models.CharField(blank=True, max_length=12, null=True)),
                ('bloodGroup', models.CharField(blank=True, max_length=4, null=True)),
                ('contactNumber', models.CharField(blank=True, max_length=20, null=True)),
                ('profilePicture', models.ImageField(upload_to='uploads/profile_pictures/')),
                ('skillSet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientserver.skillset')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('working', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientserver.currentwork')),
            ],
        ),
    ]