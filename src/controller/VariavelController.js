const { VariavelCreate } = require('./VariavelCreate');
const {
    VariavelRequestByName,
    VariavelRequestFiltered,
    VariavelRequestAllNames,
    VariavelRequestFilteredByFixedPeriod,
} = require('./VariavelRequest');
const Variavel = require('../models/variavel');

module.exports = {
    async createVariavel(request, response) {
        try {
            const variavel = await VariavelCreate(request);
            return response.json({ variavel, resposta: 'Sucesso!!' });
        } catch (err) {
            return response.status(404).json(err);
        }
    },

    async requestAllVariableNames(request, response) {
        try {
            const variavels = await VariavelRequestAllNames();
            return response.json({ variavels, resposta: 'Sucesso!!' });
        } catch (err) {
            return response.status(404).json(err);
        }
    },

    async requestVariavelByName(request, response) {
        try {
            const variavels = await VariavelRequestByName(request);
            return response.json({ variavels, resposta: 'Sucesso!!' });
        } catch (err) {
            return response.status(404).json(err);
        }

    },

    async requestVariavelFiltered(request, response) {
        try {
            const variavels = await VariavelRequestFiltered(request);
            return response.json({ variavels, resposta: 'Sucesso!!' });
        } catch (err) {
            return response.status(404).json(err);
        }
    },

    async requestVariavelFilteredByFixedPeriod(request, response) {
        try {
            const variavels = await VariavelRequestFilteredByFixedPeriod(request);
            return response.json({ variavels, resposta: 'Sucesso!!' });
        } catch (err) {
            return response.status(404).json(err);
        }

    },
};