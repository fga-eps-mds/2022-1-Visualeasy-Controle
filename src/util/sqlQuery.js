const Variavel = require('../models/variavel');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

module.exports = {
  async getDados(variavel, startDate, endDate, granularity) {
    let variavels
    const daySeq = sequelize.fn('date_part', 'day', sequelize.col("data"))
    const monthSeq = sequelize.fn('date_part', 'month', sequelize.col("data"))
    const yearSeq = sequelize.fn('date_part', 'year', sequelize.col("data"))
    const hourSeq = sequelize.fn('date_part', 'hour', sequelize.col("data"))
    const minuteSeq = sequelize.fn('date_part', 'minute', sequelize.col("data"))
    const secondSeq = sequelize.fn('date_part', 'second', sequelize.col("data"))
    let attributesParameters
    let groupParameters
    switch(granularity){
      case 'year':
        attributesParameters = [yearSeq, "date"]
        groupParameters = [yearSeq]
      break
      case 'month':
        attributesParameters = [sequelize.fn('concat', monthSeq,'-', yearSeq), "date"]
        groupParameters = [yearSeq, monthSeq]
      break
      case 'day':
        attributesParameters = [sequelize.fn('concat', daySeq, '-', monthSeq, '-', yearSeq), "date"]
        groupParameters = [yearSeq, monthSeq, daySeq]
      break
      case 'hour':
        attributesParameters = [sequelize.fn('concat',
          daySeq, '-', monthSeq, '-', yearSeq, ' ', hourSeq), "date"]
        groupParameters = [yearSeq, monthSeq, daySeq, hourSeq]
      break
      case 'minute':
        attributesParameters = [sequelize.fn('concat',
          daySeq, '-', monthSeq, '-', yearSeq, ' ', hourSeq, ':', minuteSeq), "date"]
        groupParameters = [yearSeq, monthSeq, daySeq, hourSeq, minuteSeq]
      break
      case 'second':
        attributesParameters = [sequelize.fn('concat',
          daySeq, '-', monthSeq, '-', yearSeq, ' ', hourSeq, ':', minuteSeq, ':', secondSeq), "date"]
        groupParameters = [yearSeq, monthSeq, daySeq, hourSeq, minuteSeq, secondSeq]
      break
      default:
        return undefined
    }
    variavels = await Variavel.findAll({
      attributes: [
        attributesParameters,
        [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
      ],
      where: {
        [Op.and]: [
          { variavel: variavel },
          { data: { [Op.between]: [startDate, endDate] } }
        ]
      },
      group: groupParameters,
      order: groupParameters
    })
    return variavels
  },

}