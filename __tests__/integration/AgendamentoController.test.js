const request = require("supertest");
const app = require("../../src/app");
const moment = require("moment");

let paciente;

beforeEach(async () => {
    paciente = {
        nome:"Peter Parker",
        dataNascimento:"14/10/1998",
        dataAgendada:"13/04/2023",
        horaAgendada:"00:00",
        status: false}
})


describe("MIDDLEWARE - POST /api/agendamentos", () => {
    it("Verifica se um paciente sem nome não é cadastrado", async () => {
        paciente.nome = ''
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(422)
            .then(response => {
                expect(response.body.mensagem).toEqual("O nome é obrigatório!")
            })
    })

    it("Verifica se um paciente sem data de nascimento não é cadastrado", async () => {
        paciente.dataNascimento = ''
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(422)
            .then(response => {
                expect(response.body.mensagem).toEqual("A data de nascimento é obrigatória!")
            })
    })

    it("Verifica se um paciente sem data agendada não é cadastrado", async () => {
        paciente.dataAgendada = ''
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(422)
            .then(response => {
                expect(response.body.mensagem).toEqual("A data agendada é obrigatória!")
            })
    })

    it("Verifica se um paciente sem hora agendada não é cadastrado", async () => {
        paciente.horaAgendada = ''
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(422)
            .then(response => {
                expect(response.body.mensagem).toEqual("A hora agendada é obrigatória!")
            })
    })

    it("Verifica se a hora agendada pelo paciente tem um intervalo de 1 hora", async () => {
        paciente.horaAgendada = "18:35"
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(422)
            .then(response => {
                expect(response.body.mensagem).toEqual("O intervalo de tempo entre um agendamento e outro deve ser de 1 hora!")
            })
    })
})

describe("POST /api/agendamentos", () => {

    //TODO melhorar esse teste, retornar o corpo do objeto talvez?
    it("Deve agendar um paciente no horário e data fornecidos", async () => {
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(201)
            .then(response => {
                expect(response.body.mensagem).toEqual("Agendamento Completo");
                expect(response.body.agendamento).toEqual(paciente)
            })
    })

    it("Deve limitar dois pacientes no mesmo horário", async () => {
        await mockPost(1);
        paciente.horaAgendada = '00:00' //Reinicia horas no Mock
        await mockPost(1);

        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(405)
            .then(response => {
                expect(response.body.mensagem).toEqual("Numero de pacientes agendados no mesmo horário excedidos")
            })
    })

    it("Deve limitar mais de 20 pacientes no mesmo dia", async () => {
        await mockPost(20)
        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
            .expect(405)
            .then(response => {
                expect(response.body.mensagem).toEqual("Numero de pacientes agendados excedidos para o dia")
            })
    })

})

async function mockPost(quantidade = 1) {

    for (let i=0; i < quantidade; i++) {
        paciente.horaAgendada = moment(paciente.horaAgendada, 'HH:mm')
                                 .add(1, 'h')
                                 .format("HH:mm")

        await request(app)
            .post("/api/agendamentos")
            .send(paciente)
    }
}