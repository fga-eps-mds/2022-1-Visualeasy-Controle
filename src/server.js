const https = require('https');
const fs = require('fs');

const app = require('./app');

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

