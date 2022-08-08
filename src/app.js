const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");

const db = require('./config/db')

const app = express();
var cors = require('cors');
app.use(cors());

const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(routes);

const sequelize = new Sequelize(db);

app.get('/', (req, res) => {
    res.json('Hello visualeasy.');
});

module.exports = app;