const https = require('https');
const fs = require('fs');

const express = require('express');
const routes = require('./routes');

const db = require('./config/db')

const app = express();

const Sequelize = require('sequelize');


app.use(express.json());
app.use(routes);

const sequelize = new Sequelize(db);

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync('key.pem'),
            cert: fs.readFileSync('cert.pem'),
        },
        app,
    )
    .listen(8080, () => {
        console.log('Estou rodando !!!');
    });

app.get('/', (req, res) => {
    res.send('Hello visualeasy.');
});

app.post('/testando', (request, response) => {
    console.log(request.body)
    response.json({
        name: 'teste'
    });
})