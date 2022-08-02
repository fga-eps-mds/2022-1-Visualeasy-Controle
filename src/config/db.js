module.exports = {
    dialect: "postgres",
    host: process.env.HOST || "172.25.0.2",
    username: process.env.USER ||"developer",
    password: process.env.PASSWORD || "developer",
    database: process.env.DATABASE || "dev_database",

    define: {
        timestamps: false,
    },
};