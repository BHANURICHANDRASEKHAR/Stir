import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('woeid', '23424848'); 

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

 const getTopTrends = async (setLoading,data,setdata) => {
    setLoading(true);

  try {
    const response = await axios.request(options);
    const trends = response.data.trends;
    // Ensure the response has trends
    console.log(trends);
    const top5Trends = Object.entries(trends).slice(0, 5);

    top5Trends.forEach(([key, value], index) => {
      console.log(`${index + 1}: ${key} - ${JSON.stringify(value)}`);
    });
    setdata(top5Trends);
  } catch (error) {
    console.error('Error fetching trends:', error.response?.data || error.message);
  }
  finally{
    setLoading(false);
   
  }
};

export default getTopTrends;
