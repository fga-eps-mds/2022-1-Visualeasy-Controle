const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const cors = require('cors');

const db = require('./config/db')

let app = express();

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(routes);

const sequelize = new Sequelize(db);

app.get('/', cors(corsOptions) ,(req, res) => {
    res.json('Hello visualeasy.');
});

module.exports = app;