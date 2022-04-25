const PacienteModel = require("../models/PacienteModel.js");
const moment = require("moment");

module.exports = class AgendamentoController {

    agendamentos = [];

    async agendarPaciente(request, response) {
        let { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

        const paciente = new PacienteModel(nome, dataNascimento, dataAgendada, horaAgendada);

        // Checa o limite de pacientes por data (max 20)
        const pacientesPorDataAgendada = this.#getPacientesPorDataAgendada(dataAgendada);
        if (pacientesPorDataAgendada.length >= 20) {
            response.status(405).json({mensagem: "Numero de pacientes agendados excedidos para o dia"});
            return;
        }

        // Checa o limite de pacientes por data e hora (max 2)
        const pacientesMesmaDataHora = this.#getPacientesMesmaDataHora(dataAgendada, horaAgendada)
        if (pacientesMesmaDataHora.length >= 2){
            response.status(405).json({mensagem: "Numero de pacientes agendados no mesmo horário excedidos"});
            return;
        }

        this.agendamentos.push(paciente);

        response.status(201).json({ mensagem: "Agendamento Completo", agendamento: paciente});
    }

    // Retorna agendamentos agrupados por dia e hora do agendamento
    async listarAgendamentosPorDataHora(request, response) {
        const agendamentosOrdenados = this.#getAgendamentosOrdenados()
        const mapAgendamentos =  AgendamentoController.#getMapAgendamentos(agendamentosOrdenados)

        if(this.agendamentos.length === 0) {
            return response.status(200).json({ mensagem: "Nenhum agendamento cadastrado"});
        }
        return response.status(200).json({ mensagem: "Agendamentos listados com sucesso", agendamentos: mapAgendamentos });
    }

    async mudarStatusAgendamento(request, response) {
        const id = request.params.id
        const novoStatus = request.body.status;

        const agendamento = this.agendamentos.filter(paciente => paciente.id === id)[0]

        if (agendamento === undefined){
            response.status(404).json({mensagem: "Agendamento não encontrado"});
            return;
        }

        agendamento.status = novoStatus;

        return response.status(201).json({mensagem: "Status atualizado", agendamento: agendamento });
    }


    #getPacientesPorDataAgendada(dataAgendada) {
        return this.agendamentos.filter(paciente => paciente.dataAgendada === dataAgendada);
    }

    #getPacientesMesmaDataHora(dataAgendada, horaAgendada) {
        const pacientesPorDataAgendada = this.#getPacientesPorDataAgendada(dataAgendada);
        return pacientesPorDataAgendada.filter(paciente => paciente.horaAgendada === horaAgendada)
    }

    static #getMapAgendamentos(agendamentosArray) {
        if (agendamentosArray.length === 0) {return ''}

        return agendamentosArray.reduce((grupos, agendamento) => {
            const key = agendamento.dataAgendada + " " + agendamento.horaAgendada;
            if (!grupos[key]) {
                grupos[key] = [];
            }
            grupos[key].push(agendamento);
            return grupos;
        }, {});
    }

    #getAgendamentosOrdenados() {
        return this.agendamentos.sort(function (a, b) {
            const dataA = moment(a.dataAgendada + ' ' + a.horaAgendada, 'DD/MM/YYYY HH:mm').toDate()
            const dataB = moment(b.dataAgendada + ' ' + b.horaAgendada, 'DD/MM/YYYY HH:mm').toDate()
            return dataA > dataB ? 1 : -1;
        });

    }
}



