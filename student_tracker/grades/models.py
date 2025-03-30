from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    scores = models.JSONField()

    def get_average_score(self):
        if not self.scores:
            return 0
        return sum(self.scores) / len(self.scores)
    
    def get_highest_score(self):
        return max(self.scores, default=0)
    
    def __str__(self):
        return f"{self.name} (Avg:
        {self.get_average_score():.2f})"        
# Create your models here.
