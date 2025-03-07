from django.shortcuts import render
from rest_framework import generics
from .models import CodeSubmission
from .serializers import CodeSubmissionSerializer
from .utils import analyze_code_formatted
# Create your views here.

class CodeSubmissionListCreate(generics.ListCreateAPIView):
    queryset = CodeSubmission.objects.all()
    serializer_class = CodeSubmissionSerializer

    def perform_create(self, serializer):
        code = self.request.data.get('code')
        language = self.request.data.get('language')
        analysis_result = analyze_code_formatted(code, language)
        serializer.save(analysis_result=analysis_result)
