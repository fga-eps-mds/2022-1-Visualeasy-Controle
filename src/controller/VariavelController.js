const { VariavelCreate } = require('./VariavelCreate');
const {
  VariavelRequestByName,
  VariavelRequestFiltered,
  VariavelRequestAllNames,
} = require('./VariavelRequest');
const Variavel = require('../models/variavel');

module.exports = {
  async createVariavel(request, response) {
    const variavel = await VariavelCreate(request);
    return response.json({ variavel, resposta: 'Sucesso!!' });
  },

  async requestAllVariableNames(request, response) {
    const variavels = await VariavelRequestAllNames();
    return response.json({ variavels, resposta: 'Sucesso!!' });
  },

  async requestVariavelByName(request, response) {
    //const variavels = await VariavelRequestUniques(request);
    const variavels = await VariavelRequestByName(request);
    return response.json({ variavels, resposta: 'Sucesso!!' });
  },

  async requestVariavelFiltered(request, response) {
    const variavels = await VariavelRequestFiltered(request);
    return response.json({ variavels, resposta: 'Sucesso!!' });
  },
};
