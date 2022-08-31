const express = require('express');
const cors = require('cors');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

let allowlist = [
  'https://visualeasy-controle.herokuapp.com/variavel/',
  'https://visualeasy-controle.herokuapp.com/variavel/create',
  'https://visualeasy-controle.herokuapp.com/variavel/getNamesByName',
  'https://visualeasy-controle.herokuapp.com/variavel/filtered',
  'https://visualeasy-controle.herokuapp.com/variavel/filteredByPeriod',
]

function corsOptionsDelegate (number) {
  let corsOptions = {

    origin: allowlist[number],
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

  return corsOptions;
}

variavelRouter.get('/', cors(corsOptionsDelegate(0)) ,VariavelControler.requestAllVariableNames);

variavelRouter.post('/create', cors(corsOptionsDelegate(1)) ,VariavelControler.createVariavel);
variavelRouter.post('/getNamesByName', cors(corsOptionsDelegate(2)) ,VariavelControler.requestVariavelByName); // request/variableNames
variavelRouter.post('/filtered', cors(corsOptionsDelegate(3)) ,VariavelControler.requestVariavelFiltered); // request/variables
variavelRouter.post('/filteredByPeriod', cors(corsOptionsDelegate(4)), VariavelControler.requestVariavelFilteredByFixedPeriod);

module.exports = variavelRouter;
