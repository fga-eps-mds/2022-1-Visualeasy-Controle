const spy = jest.fn();
const Variavel = require('../src/models/variavel');
const { response } = require('express');
const request = require('supertest');
const app = require('../src/app');

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Test VariavelController.js exceptions', () => {
    it('should test createVariable exception', async() => {
        jest.spyOn(Variavel, 'create').mockImplementation((req) => {
            throw "Exception Occurred";
        });
        const response = await request(app)
            .post('/variavel/create')
            .send();
        expect(response.statusCode).toBe(404);
    });
    it('should test requestAllVariableNames exception', async() => {
        jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
            throw "Exception Occurred";
        });
        const response = await request(app)
            .get('/variavel/')
            .send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Exception Occurred");
    });
    it('should test requestVariavelByName exception', async() => {
        jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
            throw "Exception Occurred";
        });
        const response = await request(app)
            .post('/variavel/getNamesByName')
            .send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Exception Occurred");
    });
    it('should test requestVariavelFiltered exception', async() => {
        jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
            throw "Exception Occurred";
        });
        const response = await request(app)
            .post('/variavel/filtered')
            .send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Exception Occurred");
    });
    it('should test requestVariavelFilteredByFixedPeriod exception', async() => {
        jest.spyOn(Variavel, 'findAll').mockImplementation((req) => {
            throw "Exception Occurred";
        });
        const response = await request(app)
            .post('/variavel/filteredByPeriod')
            .send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Exception Occurred");
    });
});