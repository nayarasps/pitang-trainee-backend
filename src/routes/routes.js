const { Router } = require("express");
const AgendamentoRouter = require("./AgendamentoRouter.js");

const router = Router();

router.use(AgendamentoRouter);

module.exports = router;