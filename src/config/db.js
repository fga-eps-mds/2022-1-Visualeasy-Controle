require('dotenv').config();

module.exports = {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: false,
    },
};