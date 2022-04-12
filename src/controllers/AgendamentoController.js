const PacienteModel = require("../models/PacienteModel.js");

module.exports = class AgendamentoController {

    agendamentos = new Map();

    async agendarPaciente(request, response) {
        const { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

        const paciente = new PacienteModel(nome, dataNascimento, dataAgendada, horaAgendada);

        const pacientesPorDataAgendada = this.#getPacientesPorDataAgendada(dataAgendada);

        const checaLimitePacientesPorDataAgendada = pacientesPorDataAgendada.length >= 20
        if (checaLimitePacientesPorDataAgendada) {
            response.status(405).json({Erro: "Numero de pacientes agendados excedidos para o dia"});
            return;
        }

        if (this.#LimiteDePacientesNoMesmoHorario(pacientesPorDataAgendada, horaAgendada)){
            response.status(405).json({Erro: "Numero de pacientes agendados no mesmo horário excedidos"});
            return;
        }

        pacientesPorDataAgendada.push(paciente);

        this.agendamentos.set(dataAgendada, pacientesPorDataAgendada);
        console.log(this.agendamentos)

        response.json({ message: "Agendamento Completo" });
    }

    #LimiteDePacientesNoMesmoHorario(pacientesPorDataAgendada, horaAgendada) {
        let pacientesNaMesmaHora = 0
        pacientesPorDataAgendada.filter(obj => {
            if (obj.horaAgendada === horaAgendada) {pacientesNaMesmaHora++}
        })
        return pacientesNaMesmaHora >= 2;
    }


    #getPacientesPorDataAgendada(dataAgendada) {
        if (this.agendamentos.has(dataAgendada)) {
            return this.agendamentos.get(dataAgendada);
        }
        return [];
    }

}



