import mysql from "mysql";
import ApiError from "../utils/ApiErrors.js";

<<<<<<< HEAD
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
=======
let connection;

const connectToDatabase = () => {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 3309,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to database:", err);
            setTimeout(connectToDatabase, 5000); // Retry connection after 5 seconds
        } else {
            console.log("Connected to database as ID:", connection.threadId);
        }
    });

    connection.on("error", (err) => {
        console.error("Database connection error:", err);

        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Reconnecting to database...");
            connectToDatabase(); // Reconnect on connection loss
        } else {
            throw new ApiError(500, "Unhandled database error.");
        }
    });
};

// Initialize the database connection
connectToDatabase();

export { connection };
>>>>>>> aabd336 (Added frontend and updated inventory-backend)
