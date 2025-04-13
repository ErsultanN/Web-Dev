from django.urls import path
from . import views

urlpatterns = [
    # Function-based views for Company
    path('companies/', views.company_list),
    path('companies/<int:id>/', views.company_detail),
    path('companies/<int:id>/vacancies/', views.company_vacancies),
    
    # Class-based views for Vacancy
    path('vacancies/', views.VacancyListAPIView.as_view()),
    path('vacancies/<int:id>/', views.VacancyDetailAPIView.as_view()),
    
    # Alternative generic class-based views
    path('vacancies/generic/', views.VacancyListCreateAPIView.as_view()),
    path('vacancies/generic/<int:id>/', views.VacancyDetailUpdateDeleteAPIView.as_view()),
    
    # Top 10 vacancies
    path('vacancies/top_ten/', views.top_ten_vacancies),
]
