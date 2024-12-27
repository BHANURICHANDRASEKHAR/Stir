import express from 'express';
import Trend from './Database/Schema.js';

import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

dotenv.config();

const router = express.Router();

export default router.post('/', async (req, res) => {
   console.log(req.ip)
    try {
       const data= await getTopTrends();
       if(data.success)
       {
        const trends=data.trends.map((t)=>{
            return t.details.name
        })
          const trendData = new Trend({
                uniqueId: uuidv4(),
                trends: trends,
                timestamp: new Date(),
                ipAddress: req.ip,
  
            });
            await trendData.save();
            res.status(200).json({ message: "Trends fetched successfully", data: trendData,status:true });

       }
       res.status(500).json({ message: " Error To Fetch Trends",status:false });

       
    } catch (error) {
        return res.status(403).json({
            message: 'Unable to fetch trends. Check your access level or consider upgrading your Twitter API plan.',
            error: error.message,
        });
    }
});

const getTopTrends = async (woeid = '23424848') => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('woeid', woeid); // Default to India WOEID

  const options = {
    method: 'POST',
    url: 'https://twitter-trends5.p.rapidapi.com/twitter/request.php',
    headers: {
      'x-rapidapi-key': '0480c11929msh80c307a53902b53p192c60jsn3b1ca5068d75',
      'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    const trends = response.data.trends;

    // Extract and format the top 5 trends
    const top5Trends = Object.entries(trends)
      .slice(0, 5)
      .map(([key, value]) => ({
        name: key,
        details: value,
      }));
     
    return { success: true, trends: top5Trends };
  } catch (error) {
    console.error('Error fetching trends:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

