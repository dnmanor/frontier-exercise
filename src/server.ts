import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());

export default app;
