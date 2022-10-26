const Variavel = require('../models/variavel');

module.exports = {
    /**
     * Create variable with request ==> ID; VARIAVEL; DATA; VALOR;
     */
    async VariavelCreate(request) {
        try {
            const { id, variavel, data, valor } = request.body;
            const newVariavel = await Variavel.create({ id, variavel, data, valor });
            return newVariavel;
        } catch (err) {
            return response.status(404).json(err);
        }
    },
};