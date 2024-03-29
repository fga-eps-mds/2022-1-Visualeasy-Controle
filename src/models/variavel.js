const database = require('../config/db');
const { Sequelize, DataTypes } = require('sequelize');
let sequelize;

if (process.env.NODE_ENV == "development") {
    sequelize = new Sequelize(database);
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

const Variavel = sequelize.define('variavel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    variavel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE
    },
    valor: {
        type: DataTypes.DOUBLE
    }
}, { schema: "variavel", timestamps: false });

module.exports = Variavel;