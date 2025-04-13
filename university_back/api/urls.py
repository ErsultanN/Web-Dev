from django.urls import path
from . import views

urlpatterns = [
    path('universities/', views.UniversityList.as_view(), name='university-list'),
    path('universities/<int:pk>/', views.UniversityDetail.as_view(),name='university-detail'),
    path('universities/<int:id>/internships', views.InternshipByUniversity.as_view(),name='internships-by-university'),
    path('internships/', views.InternshipList.as_view(), name='internship-list'),
    path('internships/<int:pk>/', views.InternshipDetail.as_view(),name='internship-detail'),
    path('internships/top_ten/', views.top_internships,name='top-internships'),
    
]
