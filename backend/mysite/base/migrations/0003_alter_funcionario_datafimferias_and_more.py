# Generated by Django 4.1.4 on 2023-06-22 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_funcionario_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='funcionario',
            name='dataFimFerias',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='funcionario',
            name='dataInicioFerias',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='funcionario',
            name='dataSaida',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]