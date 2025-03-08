from django.urls import path
from .views import CodeSubmissionListCreate

urlpatterns = [
    path('submissions/', CodeSubmissionListCreate.as_view(), name="code_submisiions"),
]