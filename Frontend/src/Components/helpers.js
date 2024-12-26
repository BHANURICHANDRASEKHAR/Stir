import axios from 'axios';
import {successfunction,errorfunction} from '../toast'
export default async function fetchTrends(setLoading,Data,SetData) {
    setLoading(true);
    try {
      const res=await axios.post("http://localhost:5000/fetch-trends");
      Data.push(res.data.data);
      SetData(Data);
      successfunction('Successfully fetched')
    } catch (error) {
      console.error(error);
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
        console.log(res.data.status);
        successfunction('Successfully fetched Trends data')
      }
    } catch (error) {
      errorfunction('Failed to get trends data')
    } finally {
      setLoading(false);
    }
  
}