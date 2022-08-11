const spy = jest.fn();
const Variavel = require('../src/models/variavel');
const { response } = require('express');
const request = require('supertest');
const app = require('../src/app');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Test VariavelRequest.js functions', () => {
  it('should ask controller to get all variable distinct names', async () => {
    const payload = [
      {
        variavel: 'teste',
      },
      {
        variavel: 'cocacola',
      },
      {
        variavel: 'pepsi',
      },
      {
        variavel: 'dydyo',
      },
    ];

    const checkPayload = {
      variavels: [
        {
          variavel: 'teste',
        },
        {
          variavel: 'cocacola',
        },
        {
          variavel: 'pepsi',
        },
        {
          variavel: 'dydyo',
        },
      ],
      resposta: 'Sucesso!!',
    };

    jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
      return payload;
    });

    const response = await request(app).get('/variavel/').send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(checkPayload);
  });

  it('should ask controller to run requestByName function', async () => {
    const entrada = {
      variavel: 't',
    };

    const saida = {
      variavels: [
        {
          variavel: 'test',
        },
        {
          variavel: 'teste',
        },
      ],
      resposta: 'Sucesso!!',
    };

    const mockData = [
      {
        variavel: 'test',
      },
      {
        variavel: 'no',
      },
      {
        variavel: 'teste',
      },
    ];

    jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
      let dataT = [];
      for (var i = 0; i < mockData.length; i++)
        if (mockData[i]['variavel'].includes(entrada['variavel']))
          dataT.push(mockData[i]);
      return dataT;
    });
    const response = await request(app)
      .post('/variavel/getNamesByName')
      .send(entrada);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(saida);
  });
  it('should ask controller to run requestFiltered function', async () => {
    const entrada = {
      variavel: 'test',
      startDate: '2014-04-23 06:18:00.000',
      endDate: '2014-04-23 06:19:00.000',
    };

    const saida = {
      variavels: [
        {
          id: 3,
          variavel: 'test',
          data: '2014-04-23 06:18:30.000',
          valor: 23,
        },
      ],
      resposta: 'Sucesso!!',
    };

    const mockData = [
      {
        id: 3,
        variavel: 'test',
        data: '2014-04-23 06:18:30.000',
        valor: 23,
      },
      {
        id: 4,
        variavel: 'test',
        data: '2014-04-23 06:19:01.000',
        valor: 423,
      },
      {
        id: 5,
        variavel: 'teste',
        data: '2016-06-05 03:45:00.000',
        valor: 25,
      },
    ];

    jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
      let dataT = [];
      for (var i = 0; i < mockData.length; i++) {
        if (
          mockData[i]['variavel'] == entrada['variavel'] &&
          mockData[i]['data'] >= entrada['startDate'] &&
          mockData[i]['data'] <= entrada['endDate']
        )
          dataT.push(mockData[i]);
      }
      return dataT;
    });

    const response = await request(app)
      .post('/variavel/filtered')
      .send(entrada);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(saida);
  });
  it('should get variable information with time fixed.', async () => {

    let payload =
      {
        "variavel": "Mewtwo"
      };    

    const mockDate = "2022-08-09T14:13:42.510Z";

    const mockData = [
      {
        "id": 4641,
        "variavel": "Mewtwo",
        "data": "2022-08-09T14:12:43.510Z",
        "valor": "13.1332"
      },
      {
        "id": 4642,
        "variavel": "Mewtwo",
        "data": "2022-08-09T12:05:43.510Z",
        "valor": "13.1332"
      },
      {
        "id": 4643,
        "variavel": "Mewtwo",
        "data": "2022-08-08T14:11:43.510Z",
        "valor": "13.1332"
      },
      {
        "id": 4644,
        "variavel": "Mewtwo",
        "data": "2022-08-02T14:12:43.510Z",
        "valor": "13.1332"
      },
    ];

    const checkPayload = {
      variavels: [
        {
          "id": 4641,
          "variavel": "Mewtwo",
          "data": "2022-08-09T14:12:43.510Z",
          "valor": "13.1332"
        },
        {
          "id": 4642,
          "variavel": "Mewtwo",
          "data": "2022-08-09T12:05:43.510Z",
          "valor": "13.1332"
        },
        {
          "id": 4643,
          "variavel": "Mewtwo",
          "data": "2022-08-08T14:11:43.510Z",
          "valor": "13.1332"
        },
        {
          "id": 4644,
          "variavel": "Mewtwo",
          "data": "2022-08-02T14:12:43.510Z",
          "valor": "13.1332"
        },
      ],
      resposta: 'Sucesso!!',
    };

    jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
      let dataT = [];
      let dateLimit = new Date(mockDate)
      switch(payload["intervalo"]) {
        case 1: 
          dateLimit.setHours(dateLimit.getHours() - 1);
          break;
        case 2: 
          dateLimit.setDate(dateLimit.getDate() - 1);
          break;
        case 3:
          dateLimit.setDate(dateLimit.getDate() - 7);
          break;
        case 4:
          dateLimit.setDate(dateLimit.getDate() - 30);
          break;
        default:
          break;
      }
      for (var i = 0; i < mockData.length; i++) {
        const date = new Date(mockData[i]['data'])
        if(
          mockData[i]['variavel'] == payload['variavel'] &&
          date >= dateLimit
        )
          dataT.push(mockData[i]);
      }
      return dataT;
    });

    for(var i = 0; i <= 4; i++){
      payload["intervalo"] = i
      let response = await request(app).post('/variavel/filteredByPeriod').send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body.variavels).toEqual(checkPayload.variavels.slice(0, i));
    }
  });
});
