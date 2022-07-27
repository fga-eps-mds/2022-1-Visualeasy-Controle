const { VariavelCreate } = require('./VariavelCreate');
const Variavel = require('../models/variavel');

module.exports = {

    async createVariavel(request, response) {
        const variavel = await VariavelCreate(request);
        return response.json({ variavel, resposta: 'Sucesso!!' });
    },
};