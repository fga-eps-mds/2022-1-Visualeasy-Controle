const request = require('supertest');

const app = require('../src/app')

describe('Application on general', () => {
    it('should ask controller to run creation function', async() => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual('Hello visualeasy.');
    })
})
