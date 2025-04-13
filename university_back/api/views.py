

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from .models import University, Internship
from .serializers import UniversitySerializer, InternshipSerializer

class UniversityList(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class UniversityDetail(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    

class InternshipByUniversity(generics.ListAPIView):
    serializer_class = InternshipSerializer
    def get_queryset(self):
        university_id =self.kwargs['id']
        return Internship.objects.filter(university_id=university_id)


class InternshipList(generics.ListAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    

class InternshipDetail(generics.RetrieveAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer



@api_view(['GET'])
def top_internships(request):
    internships = Internship.objects.order_by('-stipend')[:10]
    serializer = InternshipSerializer(internships, many=True)
    return Response(serializer.data)

 