const Variavel = require('../models/variavel');
const Sequelize = require('sequelize');

module.exports = {

    /*async VariavelRequestUniques() {
        const variavels = Variavel.findAll({attributes: 
              [[Sequelize.fn('DISTINCT', Sequelize.col('variavel')), 'variavel']]
          });
        return variavels;
    },*/

    async VariavelRequestByName(request) {
        const variavel = "%" + request.body.variavel + "%";
        const variavels = Variavel.findAll({
            attributes: 
              [[Sequelize.fn('DISTINCT', Sequelize.col('variavel')), 'variavel']], 
            where: {
                variavel: {[Sequelize.Op.like]: variavel}
              }
        });
        return variavels;
    },

    async VariavelRequestFiltered(request) {
        const {variavel, startDate, endDate} = request.body;
        const variavels = Variavel.findAll({where: {
            variavel: variavel,
            data: {[Sequelize.Op.between]: [startDate, endDate]}
          }
        });
        return variavels;
    }

}