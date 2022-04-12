const { Router } = require("express");
const AgendamentoController = require("../controllers/AgendamentoController.js");

const agendamentoController = new AgendamentoController();

const router = Router()

router.post('/agendamento', agendamentoController.agendarPaciente.bind(agendamentoController));

module.exports = router;