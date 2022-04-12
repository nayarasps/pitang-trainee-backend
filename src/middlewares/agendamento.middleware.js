function agendamentoMiddleware (request, response, next) {

    const { nome, dataNascimento, dataAgendada, horaAgendada } = request.body;

    if(!nome){
        response.status(422).json({ message : "O nome é obrigatório!"})
        return
    }
    if(!dataNascimento){
        response.status(422).json({ message : "A data de nascimento é obrigatória!"})
        return
    }
    if(!dataAgendada){
        response.status(422).json({ message : "O dia agendado é obrigatório!"})
        return
    }
    if(!horaAgendada){
        response.status(422).json({ message : "A hora agendada é obrigatória!"})
        return
    }

    next()
}

module.exports = agendamentoMiddleware
