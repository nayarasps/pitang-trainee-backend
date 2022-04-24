const PacienteModel = require("../models/PacienteModel.js");

module.exports = class AgendamentoController {

    agendamentos = [];

    async agendarPaciente(request, response) {
        let { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

        const paciente = new PacienteModel(nome, dataNascimento, dataAgendada, horaAgendada);

        // Checa o limite de pacientes por data (max 20)
        const pacientesPorDataAgendada =
            this.agendamentos.filter(paciente => paciente.dataAgendada === dataAgendada);
        if (pacientesPorDataAgendada.length >= 20) {
            response.status(405).json({mensagem: "Numero de pacientes agendados excedidos para o dia"});
            return;
        }

        const pacientesMesmaDataMesmoHorario =
            pacientesPorDataAgendada.filter(paciente => paciente.horaAgendada === horaAgendada)
        if (pacientesMesmaDataMesmoHorario.length >= 2){
            response.status(405).json({mensagem: "Numero de pacientes agendados no mesmo horário excedidos"});
            return;
        }

        this.agendamentos.push(paciente);

        response.status(201).json({ mensagem: "Agendamento Completo", agendamento: paciente});
    }

    async listarPacientes(request, response) {

    }


}



