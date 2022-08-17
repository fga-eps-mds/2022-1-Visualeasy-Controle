const Variavel = require('../models/variavel');
const Sequelize = require('sequelize');

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

  async VariavelRequestFiltered(request) {
    const { variavel, startDate, endDate } = request.body;
    const variavels = await Variavel.findAll({
      where: {
        variavel: variavel,
        data: { [Sequelize.Op.between]: [startDate, endDate] },
      },
    });
    return variavels;
  },

  async VariavelRequestFilteredByFixedPeriod(request) {
    const { variavel, intervalo } = request.body;

    const today = new Date();
    let period = new Date();

    switch(intervalo) {
      case 1: 
        period.setHours( period.getHours() - 1);
        break;
      case 2: 
        period.setDate( period.getDate() - 1);
        break;
      case 3:
        period.setDate( period.getDate() - 7);
        break;
      case 4:
        period.setDate( period.getDate() - 30);
        break;
      default:
        break;
    }

    const variavels = await Variavel.findAll({
      where: {
        variavel: variavel,
        data: { [Sequelize.Op.between]: [period, today] },
      },
    });
    return variavels;
  },
};
