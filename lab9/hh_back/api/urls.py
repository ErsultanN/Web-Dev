from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.company_list),
    path('companies/<int:id>/', views.company_detail),
    path('companies/<int:id>/vacancies/', views.company_vacancies),
    path('vacancies/', views.vacancy_list),
    path('vacancies/<int:id>/', views.vacancy_detail),
    path('vacancies/top_ten/', views.top_ten_vacancies),

     
    path('companies/create/', views.company_create),
    path('companies/<int:id>/update/', views.company_update),
    path('companies/<int:id>/delete/', views.company_delete),
]
