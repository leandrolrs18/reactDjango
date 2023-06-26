# Generated by Django 4.1.4 on 2023-06-22 01:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empresa',
            fields=[
                ('nome', models.CharField(blank=True, max_length=200, null=True)),
                ('imagem', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('categoria', models.CharField(blank=True, max_length=200, null=True)),
                ('descricao', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Funcionario',
            fields=[
                ('imagem', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('emprego', models.CharField(blank=True, max_length=200, null=True)),
                ('dataEntrada', models.DateTimeField(null=True)),
                ('dataSaida', models.DateTimeField(null=True)),
                ('dataInicioFerias', models.DateTimeField(null=True)),
                ('dataFimFerias', models.DateTimeField(null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('empresa', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.empresa')),
            ],
        ),
    ]
