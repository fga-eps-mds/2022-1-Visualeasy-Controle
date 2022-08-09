const Variavel = require('../models/variavel');

module.exports = {

  async VariavelCreate(request) {
      const { id, variavel, data, valor } = request.body;
      const newVariavel = Variavel.create({ id, variavel, data, valor });
      return newVariavel;
  }
}
