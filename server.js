import express from 'express';
import cors from "cors";
import LuxuriantRoutes from "./api/Luxuriant.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/Luxuriant", LuxuriantRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;