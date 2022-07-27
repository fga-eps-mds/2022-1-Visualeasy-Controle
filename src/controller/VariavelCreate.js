const Variavel = require('../models/variavel');

module.exports = {

    VariavelCreate(request) {
        console.log(request.body)
        const { variavel, data, valor } = request.body;
        const newVariavel = Variavel.create({ variavel, data, valor });
        return newVariavel;
    }
}