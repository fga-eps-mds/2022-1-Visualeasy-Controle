const https = require('https');
const fs = require('fs');

const app = require('./app');

const PORT = process.env.PORT || 8080;
// const HOST = '172.25.0.3';

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

app.listen(PORT, () => {
    console.log(`Servidor online no http://localhost:${PORT}`);
})