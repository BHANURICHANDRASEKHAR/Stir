import axios from 'axios';
import {successfunction,errorfunction} from '../toast'
//https://stir-nh6b.onrender.com,http://localhost:5000
export default async function fetchTrends(setLoading,Data,SetData) {
    setLoading(true);
    try {
      const res=await axios.post("http://localhost:5000/fetch-trends");
      Data.push(res.data.data);
      SetData(Data);
      successfunction('Successfully fetched')
    } catch (error) {
      console.error(error.messagec );
      errorfunction('Failed to fetch trends data')
    } finally {
      setLoading(false);
    }
  };
export async function GetTrends(setLoading,SetData)
{
    setLoading(true);
    try {
      const res=await axios.get("http://localhost:5000/get-trends");
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