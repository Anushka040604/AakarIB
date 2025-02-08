import mysql from "mysql";
import ApiError from "../utils/ApiErrors.js";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port:3309,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
    if (err) {
        console.log(new ApiError(500, "Database connection failed."));
        process.exit(1);
    } else {
        console.log("Connected to database as ID: " + connection.threadId)
    }
});

export {connection};
