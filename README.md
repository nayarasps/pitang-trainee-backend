# Pitang Trainee - Backend

Projeto final para 

Diante do cenário atual, existe uma demanda gigante de pessoas para tomar a vacina para
o COVID-19. E com isso nossa cidade está precisando de um simples sistema para realizar
os agendamentos.
O processo consiste na criação de um portal onde será possível agendar pacientes para
tomar a vacina, construir uma página para consulta dos agendamentos feitos por dia e
horário.

## Executar o Servidor (Default Port 8080)

    yarn dev

## Run the tests

    yarn test

## Regras de uso:
- A disponibilidade das vagas são de 20 por dia.
- Cada horário só tem a disponibilidade de 2 agendamentos para o mesmo horário.
- O resultado dos agendamentos devem ser agrupados por dia e hora do
agendamento.
- O intervalo de tempo entre um agendamento e outro é de 1 hora.
## Regras de negócio:
- O paciente deve informar seu nome, data de nascimento e dia e horário para o
agendamento.
- Deverá ser checado se o formulário foi preenchido.
- Os dados do paciente/agendamentos devem ser armazenados em memória.
- Quando o usuário der F5 ou recarregar a página os dados não podem ser perdidos.

# REST API

As requisições implementadas estão listadas a seguir:

## Listar agendamentos por data e hora

Agendamentos agrupados por dia e hora do agendamento

### Request

`GET /agendamentos/`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/agendamentos

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2022 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {
        "13/04/2023 01:00": [
            {
                "dataAgendada": "13/04/2023",
                "dataNascimento": "14/10/1998",
                "horaAgendada": "01:00",
                "id": "1",
                "nome": "Peter Parker",
                "status": false
            }
        ],
        "13/04/2023 02:00": [
            {
                "dataAgendada": "13/04/2023",
                "dataNascimento": "14/10/1998",
                "horaAgendada": "02:00",
                "id": "2",
                "nome": "Peter Parker",
                "status": false
            }
        ]
    }

## Criar agendamento

### Request

`POST /agendam/`

    curl -i -H 'Accept: application/json' localhost:8080/api/agendamentos

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2022 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

    {
        nome:"Peter Parker",
        dataNascimento:"14/10/1998",
        dataAgendada:"13/04/2023",
        horaAgendada:"00:00"
    }

## Mudar status do agendamento

### Request

`PATCH /agendamentos/:id`

    curl -i -H 'Accept: application/json' -X PATCH http://localhost:8080/api/agendamentos/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {
        mensagem: "Status Atualizado"
        {
            dataAgendada: "13/04/2023",
            dataNascimento: "14/10/1998",
            horaAgendada: "01:00",
            id: id,
            nome: "Peter Parker",
            status: true
        }
    }


