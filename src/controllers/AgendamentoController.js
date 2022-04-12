const PacienteModel = require("../models/PacienteModel.js");

module.exports = class AgendamentoController {

    agendamentos = new Map();

    async agendarPaciente(request, response) {
        const { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

        const paciente = new PacienteModel(nome, dataNascimento, dataAgendada, horaAgendada);

        const pacientesPorDataAgendada = this.#getPacientesPorDataAgendada(dataAgendada);

        pacientesPorDataAgendada.push(paciente);

        this.agendamentos.set(dataAgendada, pacientesPorDataAgendada);
        console.log(this.agendamentos)

        response.json({ message: "Agendamento Completo" });
    }

    #getPacientesPorDataAgendada(dataAgendada) {
        if (this.agendamentos.has(dataAgendada)) {
            return this.agendamentos.get(dataAgendada);
        }
        return [];
    }

}



