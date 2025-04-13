from django.db import models

# Create your models here.
class University(models.Model):
    name =  models.CharField(max_length=255)
    description = models.TextField()
    city = models.CharField(max_length=100)
    address = models.TextField()

    def __str__(self):
        return self.name
    
class Internship(models.Model):
    title =  models.CharField(max_length=255)
    description = models.TextField()
    stipend = models.FloatField(max_length=100)
    university = models.ForeignKey(University,on_delete=models.CASCADE, related_name='internships')

    
    def __str__(self):
        return self.title