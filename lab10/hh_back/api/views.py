from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Company, Vacancy
from .serializers import CompanyModelSerializer, VacancySerializer

# Function-based views for Company
@api_view(['GET', 'POST'])
def company_list(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanyModelSerializer(companies, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CompanyModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def company_detail(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CompanyModelSerializer(company)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CompanyModelSerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def company_vacancies(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    vacancies = company.vacancies.all()
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)

# Class-based views for Vacancy
class VacancyListAPIView(APIView):
    def get(self, request):
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = VacancySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VacancyDetailAPIView(APIView):
    def get_object(self, id):
        try:
            return Vacancy.objects.get(id=id)
        except Vacancy.DoesNotExist:
            return None
    
    def get(self, request, id):
        vacancy = self.get_object(id)
        if vacancy is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = VacancySerializer(vacancy)
        return Response(serializer.data)
    
    def put(self, request, id):
        vacancy = self.get_object(id)
        if vacancy is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = VacancySerializer(vacancy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        vacancy = self.get_object(id)
        if vacancy is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        vacancy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Alternative class-based views using generic views
class VacancyListCreateAPIView(ListCreateAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer

class VacancyDetailUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    lookup_field = 'id'

# Function for top 10 vacancies by salary
@api_view(['GET'])
def top_ten_vacancies(request):
    vacancies = Vacancy.objects.order_by('-salary')[:10]
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)
