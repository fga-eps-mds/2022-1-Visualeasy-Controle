const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`Servidor online no http://localhost:${process.env.PORT}`);
})
