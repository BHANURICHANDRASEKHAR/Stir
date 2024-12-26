import express from 'express';
import Trend from './Database/Schema.js'
const app= express.Router();
export default app.get("/", async (req, res) => {
    try {
        const trends = await Trend.find();
        console.log(trends);
        res.status(200).send({status: true,data:trends})
    } catch (error) {
        console.error("Error fetching trends from database:", error.message);
        res.status(500).json({ error: "Failed to fetch trends from database." ,status:false});
    }
});