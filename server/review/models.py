from django.db import models

# Create your models here.
class CodeSubmission(models.Model):
    LANGIAGE_CHOICES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('java', 'Java'),
        ('c++', 'C++'),
    ]
    language = models.CharField(max_length=20, choices=LANGIAGE_CHOICES)
    code = models.TextField
    analysis_result = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"submission {self.id} ({self.language})"