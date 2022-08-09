const express = require('express');

const requestRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

requestRouter.get("/variableNames", VariavelControler.requestVariavel);     // request/variableNames
requestRouter.get("/variables", VariavelControler.requestVariavelFiltered); // request/variables

module.exports = requestRouter;
