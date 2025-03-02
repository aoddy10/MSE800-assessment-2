from django.db import models
from django.utils.timezone import now

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    organization_name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"Contact from {self.name} - {self.email} - {self.subject}"