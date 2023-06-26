from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Empresa, Funcionario
from base.serializers import EmpresaSerializer, FuncionarioSerializer, UserSerializerWithToken  
from django.contrib.auth.models import User
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    funcionarios = Funcionario.objects.all()
    serializer = FuncionarioSerializer(funcionarios, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEmpresas(request):
    empresas = Empresa.objects.all()
    serializer = EmpresaSerializer(empresas, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerUser(request):
    data = request.data
    print("ola", data)
    try:
        print("olaq0")
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            is_staff=data['isAdmin'],
            password=make_password(data['password'])
        )
        print("olaq")
        empresa = Empresa.objects.get(_id=data['company'])
        print("olaqtal")
        funcionario = Funcionario.objects.create(
                                                    user=user,
                                                    imagem=data['image'],
                                                    emprego=data['job'], 
                                                    empresa=empresa,
                                                    dataEntrada=data['dataInicio'],
                                                    dataSaida=data['dataSaida'],
                                                    dataInicioFerias=data['dataFeriasInicio'],
                                                    dataFimFerias=data['dataFeriasSaida'],
                                                )

        serializer = FuncionarioSerializer(funcionario, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'Nao foi possivel criar funcionario' + str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerEmpresa(request):
    data = request.data
    print("ola", data)
    try:
        empresa = Empresa.objects.create(
            nome=data['name'],
            imagem=data['image'],
            categoria=data['category'],
            descricao=data['description']
        )

        serializer = EmpresaSerializer(empresa, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'Nao foi possivel criar empresa' + str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk1, pk2):
    print("hey")
    user = User.objects.get(id=pk1)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    funcionario = Funcionario.objects.get(_id=pk2)
    empresa = Empresa.objects.get(_id=data['company'])

    funcionario.imagem = data['image']
    funcionario.emprego = data['job']
    funcionario.empresa = empresa
    funcionario.dataEntrada = data['dataInicio']
    funcionario.dataSaida = data['dataSaida']
    funcionario.dataInicioFerias = data['dataFeriasInicio']
    funcionario.dataFimFerias = data['dataFeriasSaida']

    funcionario.save()

    serializer = FuncionarioSerializer(funcionario, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateEmpresa(request, pk1):
    print("heyjude")
    empresa = Empresa.objects.get(_id=pk1)

    data = request.data

    empresa.nome = data['name']
    empresa.imagem = data['image']
    empresa.categoria = data['category']
    empresa.descricao = data['description']

    empresa.save()

    serializer = EmpresaSerializer(empresa, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk1, pk2):
    print("hey",  pk1, pk2)
    userForDeletion = User.objects.get(id=pk1)
    print("heyj",  pk1, pk2)
    userForDeletion.delete()

    funcionarioForDeletion = Funcionario.objects.get(_id=pk2)
    funcionarioForDeletion.delete()

    return Response('Funcionário foi deletado')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEmpresa(request, pk1):
    print("heyjude")
    empresaForDeletion = Empresa.objects.get(_id=pk1)
    empresaForDeletion.delete()
    
    return Response('Empresa foi deletada')