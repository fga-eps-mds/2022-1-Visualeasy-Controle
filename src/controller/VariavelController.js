const { VariavelCreate } = require('./VariavelCreate');
const Variavel = require('../models/variavel');

module.exports = {

    createVariavel(request, response) {
        console.log(request.body)
        const variavel = VariavelCreate(request);
        return response.json(variavel);
    },
};