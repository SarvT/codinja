from django.urls import path
from .views import CodeSubmissionListCreate
from .views import register_user
from .views import login_user

urlpatterns = [
    path('submissions/', CodeSubmissionListCreate.as_view(), name="code_submissions"),
    path('register/', register_user, name="register"),
    path('login/', login_user, name="login"),

]