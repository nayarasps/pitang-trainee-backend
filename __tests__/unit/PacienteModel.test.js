const PacienteModel = require("../../src/models/PacienteModel");

describe('Testar o Objeto Paciente', () => {
    it('Criar o Paciente corretamente', () => {
        const antonio = new PacienteModel("Antonio", "13/01/1998", "22/05/2022", "12:00", "1")

        const pacienteAntonio =
            {nome: 'Antonio',
                id: "1",
                dataNascimento: '13/01/1998',
                dataAgendada: '22/05/2022',
                horaAgendada: '12:00',
                "status": false};

        expect(antonio).toEqual(pacienteAntonio)
    });

});