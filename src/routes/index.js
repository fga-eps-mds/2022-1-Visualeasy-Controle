const express = require('express');

const routes = express.Router();

const helloWorldRouter = require('./helloworld.routes');

const variavelRouter = require('./variavel.routes');

routes.use('/createVariable', variavelRouter);

routes.use('/test', helloWorldRouter);

module.exports = routes;