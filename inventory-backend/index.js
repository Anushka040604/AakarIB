import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import morgan from "morgan";
import inventoryRoute from './routes/inventory.route.js';
const app = express();
dotenv.config({ path: './.env' });

const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan('dev'));

// Routes
app.use("/api/v1/inventory", inventoryRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
});

// Start Server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port: ${port}`);
});
