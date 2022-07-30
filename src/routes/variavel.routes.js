const express = require('express');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

variavelRouter.post("/", VariavelControler.createVariavel);
variavelRouter.post("/2", VariavelControler.requestVariavel);
variavelRouter.post("/3", VariavelControler.requestVariavelFiltered);

module.exports = variavelRouter;