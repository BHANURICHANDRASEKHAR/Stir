import axios from 'axios';
import {successfunction,errorfunction} from '../toast'
//https://stir-nh6b.onrender.com,http://localhost:5000
export default async function fetchTrends(setLoading,Data,SetData) {
    setLoading(true);
    try {
      const res=await axios.post("https://stir-nh6b.onrender.com/fetch-trends", { withCredentials: true });
       if(res.data.status=true)
       {
        Data.push(res.data.data);
        SetData(Data);
        successfunction('Successfully fetched')
       }
       else{
        console.error(res.data.error)
    
       }
    } catch (error) {
      console.error(error.message);
      console.error(error)
      errorfunction('Failed to fetch trends data')
    } finally {
      setLoading(false);
    }
  };
export async function GetTrends(setLoading,SetData)
{
    setLoading(true);
    try {
      const res=await axios.get("https://stir-nh6b.onrender.com/get-trends");
      if(res.data.status)
      {
        SetData(res.data.data);
        
        successfunction('Successfully fetched Trends data')
      }
    } catch (error) {
      errorfunction('Failed to get trends data')
    } finally {
      setLoading(false);
    }
  
}