from django.shortcuts import render
from rest_framework import generics
from .models import CodeSubmission
from .serializers import CodeSubmissionSerializer
# Create your views here.

class CodeSubmissionListCreate(generics.ListCreateAPIView):
    queryset = CodeSubmission.objects.all()
    serializer_class = CodeSubmissionSerializer