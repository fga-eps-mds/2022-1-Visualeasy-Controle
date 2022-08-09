const { VariavelCreate } = require('../src/controller/VariavelCreate');
const { createVariavel } = require('../src/controller/VariavelController');
const spy = jest.fn();
const Variavel = require('../src/models/variavel');
const { response } = require('express');

const request = require('supertest');

const app = require('../src/app');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Test VariavelController.js functions', () => {
  it('should create a table in database and return', async () => {
    const request = {
      body: {
        id: 1,
        variavel: 'teste',
        data: 'wow',
        valor: 1618,
      },
    };

    const variavelCreate = {
      body: {
        id: 1,
        variavel: 'teste',
        data: 'wow',
        valor: 1618,
      },
    };

    jest.spyOn(Variavel, 'create').mockImplementation((req) => {
      return request;
    });

    const createVariavelTest = await VariavelCreate(request);

    expect(createVariavelTest).toStrictEqual(variavelCreate);
  });

  it('should ask controller to run creation function', async () => {
    const variavelCreate = {
      variavel: {
        id: 1,
        variavel: 'teste',
        data: 'wow',
        valor: 1618,
      },
      resposta: 'Sucesso!!',
    };

    const payload = {
      id: 1,
      variavel: 'teste',
      data: 'wow',
      valor: 1618,
    };

    jest.spyOn(Variavel, 'create').mockImplementation((req) => {
      return payload;
    });

    const response = await request(app).post('/variavel/create').send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(variavelCreate);
  });
});
