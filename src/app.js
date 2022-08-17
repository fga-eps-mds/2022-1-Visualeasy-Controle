const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const Sequelize = require('sequelize');

let app = express();

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet.hidePoweredBy());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialectOptions: {
    //     ssl: {
    //         require: false,
    //         rejectUnauthorized: false
    //     }
    // }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/', (req, res) => {
    res.json('Hello visualeasy.');
});


module.exports = app;