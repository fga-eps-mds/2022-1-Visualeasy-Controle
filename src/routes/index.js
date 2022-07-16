const express = require('express');

const routes = express.Router();

const helloWorldRouter = require('./helloworld.routes');

routes.use('/test', helloWorldRouter);

module.exports = routes;
