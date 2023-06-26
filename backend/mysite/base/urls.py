from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('', views.getUsers, name="users"),

    path('empresas/', views.getEmpresas, name="empresas"),

    path('register/', views.registerUser, name='register'),
    path('register/empresa/', views.registerEmpresa, name='empresa-register'),

    path('update/<str:pk1>/<str:pk2>/', views.updateUser, name='user-update'),
    path('update_empresa/<str:pk1>/', views.updateEmpresa, name='empresa-update'),

    path('delete/<str:pk1>/<str:pk2>/', views.deleteUser, name='user-delete'),
    path('delete_empresa/<str:pk1>/', views.deleteEmpresa, name='empresa-delete'),


]