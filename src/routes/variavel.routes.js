const express = require('express');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

variavelRouter.get('/', VariavelControler.requestAllVariableNames);

variavelRouter.post('/create', VariavelControler.createVariavel);
variavelRouter.post('/getNamesByName', VariavelControler.requestVariavelByName);
variavelRouter.post('/filtered', VariavelControler.requestVariavelFiltered);
variavelRouter.post('/filteredByPeriod', VariavelControler.requestVariavelFilteredByFixedPeriod);

module.exports = variavelRouter;
