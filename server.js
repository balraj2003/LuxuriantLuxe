// Importing necessary modules
import express from 'express';
import LuxuriantRoutes from "./api/Luxuriant.routes.js";
import cors from "cors";

// Creating an Express application
const app = express();

// Setting up CORS (Cross-Origin Resource Sharing) options
const corsOrigin ={
    origin:true, // Allow all origins
    optionSuccessStatus:200 // If preflight request is successful, respond with status 200
}

// Applying the CORS middleware to the Express application
app.use(cors(corsOrigin));

// Applying the express.json middleware to parse JSON bodies in the request
app.use(express.json());

// Setting up the routes for the Luxuriant API
app.use("/api/v1/Luxuriant", LuxuriantRoutes);

// Setting up a catch-all route for any requests that don't match the above routes
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Exporting the Express application for use in other modules
export default app;