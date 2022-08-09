const express = require('express');

const routes = express.Router();

const variavelRouter = require('./variavel.routes');

routes.use('/variavel', variavelRouter);

module.exports = routes;