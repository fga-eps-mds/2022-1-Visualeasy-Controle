const Sequelize = require('sequelize');
const database = require('./db');

const Variavel = database.define('variavel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    variavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE
    },
    valor: {
        type: Sequelize.DOUBLE
    }
})

module.exports = Variavel;