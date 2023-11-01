from django.db import models
from django.contrib.auth.models import AbstractUser

def avatar_upload_path(instance, filename):
    return f"avatars/{instance.id}/{filename}"

class User(AbstractUser):
    pass

    def __str__(self):
        return self.username

class UserProfile(models.Model):

    LANGUAGE_CHOICES = (
        ("English", "English"),
        ("Spanish", "Spanish"),
        ("French", "French"),
        ("German", "German"),
        ("Italian", "Italian"),
        ("Portuguese", "Portuguese"),
        ("Russian", "Russian"),
        ("Romanian", "Romanian"),
        ("Dutch", "Dutch"),
        ("Swedish", "Swedish"),
        ("Norwegian", "Norwegian"),
        ("Danish", "Danish"),
        ("Finnish", "Finnish"),
        ("Polish", "Polish"),
        ("Latvian", "Latvian"),
        ("Lithuanian", "Lithuanian"),
        ("Estonian", "Estonian"),
        ("Czech", "Czech"),
        ("Slovak", "Slovak"),
        ("Hungarian", "Hungarian"),
        ("Bulgarian", "Bulgarian"),
        ("Greek", "Greek"),
        ("Ukrainian", "Ukrainian"),
        ("Belarusian", "Belarusian"),
        ("Serbian", "Serbian"),
        ("Croatian", "Croatian"),
        ("Slovenian", "Slovenian"),
        ("Albanian", "Albanian"),
        ("Macedonian", "Macedonian"),
        ("Mandanrin", "Mandanrin"),
        ("Cantonese", "Cantonese"),
        ("Japanese", "Japanese"),
        ("Korean", "Korean"),
        ("Thai", "Thai"),
        ("Vietnamese", "Vietnamese"),
        ("Malay", "Malay"),
        ("Tagalog", "Tagalog"),
        ("Indonesian", "Indonesian"),
        ("Arabic", "Arabic"),
        ("Hebrew", "Hebrew"),
        ("Bengali", "Bengali"),
        ("Hindi", "Hindi"),
        ("Turkish", "Turkish"),
        ("Other", "Other"),
    )

    user=models.OneToOneField(User, on_delete=models.PROTECT, related_name="profile")
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to=avatar_upload_path, null=True, blank=True)
    location = models.CharField(max_length=50)
    bio = models.TextField( max_length=500, blank=True)
    native_language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    target_language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    active = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"
