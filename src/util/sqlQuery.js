const Variavel = require('../models/variavel');
const sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
  async getDados(variavel, startDate, endDate, granularity) {
    let variavels
    if (granularity === 'year') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('date_part', 'year', sequelize.col("data")), "data"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data"))]
      })
    }
    else if (granularity === 'month') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('concat', sequelize.fn('date_part', 'month', sequelize.col("data")), '-', sequelize.fn('date_part', 'year', sequelize.col("data"))), "date"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data")), sequelize.fn('date_part', 'month', sequelize.col("data"))]
      })
    }
    else if (granularity === 'day') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('concat',
            sequelize.fn('date_part', 'day', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'month', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'year', sequelize.col("data"))),
            "date"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data")), sequelize.fn('date_part', 'month', sequelize.col("data")), sequelize.fn('date_part', 'day', sequelize.col("data"))]
      })
    }
    else if (granularity === 'hour') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('concat',
            sequelize.fn('date_part', 'day', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'month', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'year', sequelize.col("data")),
            ' ',
            sequelize.fn('date_part', 'hour', sequelize.col("data")),
          ),
            "date"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data")), sequelize.fn('date_part', 'month', sequelize.col("data")), sequelize.fn('date_part', 'day', sequelize.col("data")), sequelize.fn('date_part', 'hour', sequelize.col("data"))]
      })
    }
    else if (granularity === 'minute') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('concat',
            sequelize.fn('date_part', 'day', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'month', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'year', sequelize.col("data")),
            ' ',
            sequelize.fn('date_part', 'hour', sequelize.col("data")),
            ':',
            sequelize.fn('date_part', 'minute', sequelize.col("data")),
          ),
            "date"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data")), sequelize.fn('date_part', 'month', sequelize.col("data")), sequelize.fn('date_part', 'day', sequelize.col("data")), sequelize.fn('date_part', 'hour', sequelize.col("data")), sequelize.fn('date_part', 'minute', sequelize.col("data"))]
      })
    }
    else if (granularity === 'second') {
      variavels = await Variavel.findAll({
        attributes: [
          [sequelize.fn('concat',
            sequelize.fn('date_part', 'day', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'month', sequelize.col("data")),
            '-',
            sequelize.fn('date_part', 'year', sequelize.col("data")),
            ' ',
            sequelize.fn('date_part', 'hour', sequelize.col("data")),
            ':',
            sequelize.fn('date_part', 'minute', sequelize.col("data")),
            ':',
            sequelize.fn('date_part', 'second', sequelize.col("data")),
          ),
            "date"],
          [sequelize.cast(sequelize.fn("AVG", sequelize.col("valor")), 'DECIMAL(8, 2)'), "valor"]
        ],
        where: {
          [Op.and]: [
            { variavel: variavel },
            { data: { [Op.between]: [startDate, endDate] } }
          ]
        },
        group: [sequelize.fn('date_part', 'year', sequelize.col("data")), sequelize.fn('date_part', 'month', sequelize.col("data")), sequelize.fn('date_part', 'day', sequelize.col("data")), sequelize.fn('date_part', 'hour', sequelize.col("data")), sequelize.fn('date_part', 'minute', sequelize.col("data")), sequelize.fn('date_part', 'second', sequelize.col("data"))]
      })
    }
    return variavels
  },

}