const express = require('express');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

variavelRouter.post("/create", VariavelControler.createVariavel);
variavelRouter.post("/getNamesByName", VariavelControler.requestVariavelByName);     // request/variableNames
variavelRouter.post("/filtered", VariavelControler.requestVariavelFiltered); // request/variables

module.exports = variavelRouter;