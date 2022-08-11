const Variavel = require('../models/variavel');

module.exports = {
    async VariavelCreate(request) {
        try {
            const { id, variavel, data, valor } = request.body;
            const newVariavel = Variavel.create({ id, variavel, data, valor });
            return newVariavel;
        } catch (err) {
            return response.status(404).json(err);
        }
    },
};
