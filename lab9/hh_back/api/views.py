# from django.shortcuts import render

# # Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Company, Vacancy
from .serializers import CompanySerializer, VacancySerializer

@api_view(['GET'])
def company_list(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def company_create(request):
    serializer = CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def company_detail(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CompanySerializer(company)
    return Response(serializer.data)

@api_view(['GET'])
def company_vacancies(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    vacancies = company.vacancies.all()
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def vacancy_list(request):
    vacancies = Vacancy.objects.all()
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def vacancy_detail(request, id):
    try:
        vacancy = Vacancy.objects.get(id=id)
    except Vacancy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = VacancySerializer(vacancy)
    return Response(serializer.data)

@api_view(['GET'])
def top_ten_vacancies(request):
    vacancies = Vacancy.objects.order_by('-salary')[:10]
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)


# changed

@api_view(['PUT'])
def company_update(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CompanySerializer(company, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def company_delete(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    company.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
