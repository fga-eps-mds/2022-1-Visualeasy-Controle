const express = require('express');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

variavelRouter.get('/', VariavelControler.requestAllVariableNames);

variavelRouter.post('/create', VariavelControler.createVariavel);
variavelRouter.post('/getNamesByName', VariavelControler.requestVariavelByName); // request/variableNames
variavelRouter.post('/filtered', VariavelControler.requestVariavelFiltered); // request/variables
variavelRouter.post('/filteredByPeriod', VariavelControler.requestVariavelFilteredByFixedPeriod);

module.exports = variavelRouter;
