const { Router } = require("express");
const AgendamentoController = require("../controllers/AgendamentoController.js");
const agendamentoMiddleware = require("../middlewares/agendamento.middleware.js");

const agendamentoController = new AgendamentoController();

const router = Router()

router.use(agendamentoMiddleware)
router.post('/agendamentos', agendamentoController.agendarPaciente.bind(agendamentoController));
router.get('/agendamentos', agendamentoController.listarAgendamentos.bind(agendamentoController));

module.exports = router;