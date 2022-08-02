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
                    host: process.env.HOST || "172.25.0.2",
                    user: process.env.USER || "developer",
                    database: process.env.DATABASE || "dev_database",
                    password: process.env.PASSWORD || "developer",
                    port: process.env.PORT || 5432


                    //heroku configs
                    // host: "ec2-34-235-31-124.compute-1.amazonaws.com",
                    // username: "mnmmnzexqpoimo",
                    // password: "963fbc6fa7bb8697c3d5ff78e8623822f0377c06af0f0d324c15d58be7a0c1ff",
                    // database: "ddru52vei3o20f",
                    // port: 5432


                });
                console.log(`Estou aqui!!!!${process.env.HOST}`)
                const query =
                    "INSERT INTO variavel.variavels (variavel, data, valor) VALUES ($1, $2, $3)";
                    console.log("4")

                pool.connect((err, client, done) => {
                    console.log(`O erro é esse: ${err}`)
                    if (err) throw err;
                    console.log("err")
                    try {
                        csvData.forEach(row => {
                            console.log("3")
                            client.query(query, row, (err, res) => {
                                console.log("5")
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



