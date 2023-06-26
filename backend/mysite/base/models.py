from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Empresa(models.Model):
    nome        = models.CharField(max_length=200, null=True, blank=True)
    imagem      = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    categoria   = models.CharField(max_length=200, null=True, blank=True)
    descricao   = models.TextField(null=True, blank=True)
    createdAt   = models.DateTimeField(auto_now_add=True)
    _id         = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nome


class Funcionario(models.Model):
    user                = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    imagem              = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    emprego             = models.CharField(max_length=200, null=True, blank=True) 
    empresa             = models.ForeignKey(Empresa, on_delete=models.SET_NULL, null=True)
    dataEntrada         = models.DateTimeField(null=True)
    dataSaida           = models.DateTimeField(null=True, blank=True)
    dataInicioFerias    = models.DateTimeField(null=True, blank=True)
    dataFimFerias       = models.DateTimeField(null=True, blank=True)
    createdAt           = models.DateTimeField(auto_now_add=True)
    _id                 = models.AutoField(primary_key=True, editable=False)
    
    