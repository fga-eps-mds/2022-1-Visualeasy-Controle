const express = require('express');

const routes = express.Router();

const variavelRouter = require('./variavel.routes');

routes.use('/createVariable', variavelRouter);

module.exports = routes;