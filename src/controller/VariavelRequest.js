const Variavel = require('../models/variavel');
const Sequelize = require('sequelize');
const SqlQuery = require('../util/sqlQuery')

module.exports = {

  async VariavelRequestAllNames() {
    const variavels = await Variavel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('variavel')), 'variavel'],
      ],
    });
    return variavels;
  },

  async VariavelRequestByName(request) {
    const variavel = '%' + request.body.variavel + '%';
    const variavels = await Variavel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('variavel')), 'variavel'],
      ],
      where: {
        variavel: { [Sequelize.Op.iLike]: variavel },
      },
    });
    return variavels;
  },

  /*   async VariavelRequestFiltered(request) {
      const { variavel, startDate, endDate } = request.body;
      const variavels = await Variavel.findAll({
        where: {
          variavel: variavel,
          data: { [Sequelize.Op.between]: [startDate, endDate] },
        },
      });
      return variavels;
    }, */

  async VariavelRequestFiltered(request) {
      const { variavel, startDate, endDate, granularity } = request.body;
      const variavels = await SqlQuery.getDados(variavel, startDate, endDate, granularity);
      return variavels;
  },

  async VariavelRequestFilteredByFixedPeriod(request) {
    const { variavel, intervalo, granularity } = request.body;
    const today = new Date();
    let period = new Date();
    let variavels

    switch (intervalo) {
      case 1:
        period.setHours(period.getHours() - 1);
        break;
      case 2:
        period.setDate(period.getDate() - 1);
        break;
      case 3:
        period.setDate(period.getDate() - 7);
        break;
      case 4:
        period.setDate(period.getDate() - 30);
        break;
      default:
        break;
    }
    variavels = await SqlQuery.getDados(variavel, period, today, granularity)
    return variavels;
  },
};

