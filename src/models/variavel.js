const database = require('../config/db');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(database);

// sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

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