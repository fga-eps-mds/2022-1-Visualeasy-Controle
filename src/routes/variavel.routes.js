const express = require('express');

const variavelRouter = express.Router();

const VariavelControler = require('../controller/VariavelController');

variavelRouter.post("/", VariavelControler.createVariavel);

module.exports = variavelRouter;