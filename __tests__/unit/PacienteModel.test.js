const PacienteModel = require("../../src/models/PacienteModel");

describe('Testar o Objeto Paciente', () => {
    it('Criar o Paciente corretamente', () => {
        const antonio = new PacienteModel("Antonio", "13/01/1998", "22/05/2022", "12:00")

        const pacienteAntonio =
            {nome: 'Antonio',
                dataNascimento: '13/01/1998',
                dataAgendada: '22/05/2022',
                horaAgendada: '12:00',
                "status": false};

        expect(antonio).toEqual(pacienteAntonio)
    });

    it('Mudar o status do Paciente corretamente', () => {
        const antonio = new PacienteModel("Antonio", "13/01/1998", "22/05/2022", "12:00")

        antonio.setStatus(true)
        expect(antonio.status).toEqual(true);
    });

});