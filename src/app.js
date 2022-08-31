const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const Sequelize = require('sequelize');

let app = express();

app.use(helmet.hidePoweredBy());
app.use(bodyParser.json());
app.use(routes);
if (process.env.NODE_ENV == "development") {
    const sequelize = new Sequelize(db);
} else {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = app;