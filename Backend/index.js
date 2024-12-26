import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import FetchTrends from "./FetchTrends.js";
import mongoose from "./Database/connection.js";
import GetTrends from "./GetTrends.js";
dotenv.config();

const app = express();
mongoose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:5173','https://stirassignement.netlify.app'], credentials: true, optionsSuccessStatus: 200 }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/fetch-trends",FetchTrends);
app.use("/get-trends",GetTrends);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
