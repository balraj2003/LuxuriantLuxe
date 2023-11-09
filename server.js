import express from 'express';
import cors from "cors";
import LuxuriantRoutes from "./api/Luxuriant.routes.js";
import cors from "cors";
const corsOrigin ={
    origin:'http://localhost:5173', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(express.json());

app.use("/api/v1/Luxuriant", LuxuriantRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;