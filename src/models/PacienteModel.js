const crypto = require('crypto');

class PacienteModel {

    constructor(nome, dataNascimento, dataAgendada, horaAgendada, id = crypto.randomUUID()) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.dataAgendada = dataAgendada;
        this.horaAgendada = horaAgendada;
        this.status = false;
    }

    setStatus(novoStatus) {
        this.status = novoStatus;
    }

}

module.exports = PacienteModel;