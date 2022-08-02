const VariavelModel = require('../src/models/variavel');

describe('Verify names inputed in model', () => {
  it('should return the id', () => {
    const name = 'id';

    const data = VariavelModel.getAttributes();

    expect(data.id.field).toBe(name);
  });

  it('should return the variavel', () => {
    const name = 'variavel';

    const data = VariavelModel.getAttributes();

    expect(data.variavel.field).toBe(name);
  });

  it('should return the data', () => {
    const name = 'data';

    const data = VariavelModel.getAttributes();

    expect(data.data.field).toBe(name);
  });

  it('should return the valor', () => {
    const name = 'valor';

    const data = VariavelModel.getAttributes();

    expect(data.valor.field).toBe(name);
  });
});
