class PacienteModel {

    constructor(nome, dataNascimento, dataAgendada, horaAgendada, status = false) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.dataAgendada = dataAgendada;
        this.horaAgendada = horaAgendada;
        this.status = status;
    }

    setStatus(novoStatus) {
        this.status = novoStatus;
    }

}

module.exports = PacienteModel;