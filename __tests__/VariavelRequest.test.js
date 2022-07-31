const spy = jest.fn();
const Variavel = require('../src/models/variavel');
const { response } = require('express');
const request = require('supertest');
const app = require('../src/app')


afterEach(() => {
    jest.restoreAllMocks();
})

describe('Test VariavelRequest.js functions', () => {
    it('should ask controller to run requestByName function', async() => {

        const entrada = {
            "variavel": "t"
        }

        const saida = {
            "variavels": [
                {
                    "variavel": "test"
                },
                {
                    "variavel": "teste"
                }
            ],
            "resposta": "Sucesso!!"
        }

        const mockData = [
            {
            "variavel": "test"
            },
            {
            "variavel": "no"
            },
            {
            "variavel": "teste"
            }
        ]

        jest
        .spyOn(Variavel, "findAll")
        .mockImplementation((req) => {
            dataT = []
            for(var i=0; i< mockData.length; i++)
                if(mockData[i]["variavel"].includes(entrada["variavel"]))
                    dataT.push(mockData[i])
            return dataT;
        })
        const response = await request(app).post("/createVariable/2").send(entrada)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(saida);
    })
    it('should ask controller to run requestFiltered function', async() => {

        const entrada = {
            "variavel": "test",
            "startDate": "2012-04-23",
            "endDate": "2014-04-23"
        }

        const saida = {
            "variavels": [
                {
                    "id": 3,
                    "variavel": "test",
                    "data": "2014-04-23",
                    "valor": 23
                }
            ],
            "resposta": "Sucesso!!"
        }

        const mockData = [
            {
                "id": 3,
                "variavel": "test",
                "data": "2014-04-23",
                "valor": 23
            },
            {
                "id": 4,
                "variavel": "teste",
                "data": "2014-02-12",
                "valor": 423
            },
            {
                "id": 5,
                "variavel": "test",
                "data": "2016-06-05",
                "valor": 25
            }
        ]
        
        jest
        .spyOn(Variavel, "findAll")
        .mockImplementation((req) => {
            dataT = []
            for(var i=0; i< mockData.length; i++)
                if(mockData[i]["variavel"] == entrada["variavel"] && 
                    mockData[i]["data"] >= entrada["startDate"] && 
                    mockData[i]["data"] <= entrada["endDate"])
                    dataT.push(mockData[i])
            return dataT;
        })

        const response = await request(app).post("/createVariable/3").send(entrada)
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(saida);
    })
})