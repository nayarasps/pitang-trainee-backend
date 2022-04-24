const moment = require("moment");

// TODO reforçar middleware
function agendamentoMiddleware (request, response, next) {

    const { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

    // Checagem nome não vazio
    if(!nome){
        response.status(422).json({ mensagem : "O nome é obrigatório!"})
        return
    }

    // Checagem data de nascimento não vazia
    if(!dataNascimento){
        response.status(422).json({ mensagem : "A data de nascimento é obrigatória!"})
        return
    }

    // Checagem data de agendada não vazia
    if(!dataAgendada){
        response.status(422).json({ mensagem : "A data agendada é obrigatória!"})
        return
    }

    // Checagem hora agendada não vazia
    if(!horaAgendada){
        response.status(422).json({ mensagem : "A hora agendada é obrigatória!"})
        return
    }

    // Checagem hora agendada a cada 1 hora
    if (moment(horaAgendada,'HH:mm').minutes() > 0) {
        response.status(422).json({ mensagem : "O intervalo de tempo entre um agendamento e outro deve ser de 1 hora!"})
        return
    }

    next()
}

module.exports = agendamentoMiddleware
