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

    const path = './csvFiles/populaBanco.txt'

    if (!fs.existsSync(path)) {
        const Pool = require("pg").Pool;
        const fastcsv = require("fast-csv");
        let stream = fs.createReadStream('./csvFiles/dados_unb.csv');
        let csvData = [];
        let csvStream = fastcsv
            .parse()
            .on("data", function (data) {
                csvData.push(data);
            })
            .on("end", function () {
                // remove the first line: header
                csvData.shift();
                // create a new connection to the database
                const pool = new Pool({
                    host: "172.25.0.2",
                    user: "developer",
                    database: "dev_database",
                    password: "developer",
                    port: 5432
                });
                const query =
                    "INSERT INTO variavel.variavels (variavel, data, valor) VALUES ($1, $2, $3)";
                pool.connect((err, client, done) => {
                    if (err) throw err;
                    try {
                        csvData.forEach(row => {
                            client.query(query, row, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log("inserted " + res.rowCount + " row:", row);
                                }
                            });
                        });
                    } finally {
                        done();
                    }
                });
            });
        stream.pipe(csvStream);

        fs.writeFile('./csvFiles/populaBanco.txt', 'Banco populado!!', function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });

        console.log(`Servidor online no http://localhost:${PORT}`);

    } else
        console.log(`Servidor online no http://localhost:${PORT}`);
})



