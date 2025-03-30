from django.contrib import admin
from . import models

@admin.register(models.Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_average_score', 'get_highest_score')
   
# Register your models here.
