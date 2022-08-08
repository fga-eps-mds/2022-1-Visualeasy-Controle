const express = require('express');

const routes = express.Router();

const variavelRouter = require('./variavel.routes');
const requestRouter = require('./request.routes');

routes.use('/createVariable', variavelRouter);
routes.use('/request', requestRouter);

module.exports = routes;