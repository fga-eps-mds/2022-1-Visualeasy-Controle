const express = require('express');

const HelloWorldController = require('../controller/HelloWorldController');

const helloWorldRouter = express.Router();

helloWorldRouter.get('/', HelloWorldController.findHello);

module.exports = helloWorldRouter;
