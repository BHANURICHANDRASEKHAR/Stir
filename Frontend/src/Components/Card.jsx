import React, { useEffect, useState } from 'react'
import fetchTrends,{GetTrends} from './helpers.js'
import Fetch from './help1.js'
export default function Card() {
    const [loading,setLoading]=useState(false)
    const [data,setdata]=useState([])
  return (
    <div className='container bg-transparent text-white mt-4'>
    <h1 className='m-2'>Twitter Trends</h1>
      <button onClick={()=>{fetchTrends(setLoading,data,setdata)}} disabled={loading} className='btn btn-outline-primary w-25 m-2'>
        {loading ? "Running..." : "Fetch Trends"}
      </button>
    <div className='row mt-3'>
    <h2 className='text-white  m-2'>Trending Searches:</h2>
    <Trends data={data} setdata={setdata}/>
    </div>
    </div>
  )
}

function Trends({ data, setdata }) {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if(data.length == 0) {
        GetTrends(setLoading,setdata)
    }
  },[])
  return (
    <React.Fragment>
      {data.length > 0 &&
        data.map((trend, index) => {
          const { trends, timestamp, uniqueId } = trend;
         
          return (
            <div key={uniqueId} className="col-md-4 mt-1">
              <div className="card p-2">
                <h5 className="card-title">#{index + 1}</h5>
                <p className="card-text">Time: {new Date(timestamp).toLocaleString()}</p>
                {
                    trends.length > 0 && (
                      <div className="card-body">
                        {trends.map((t, index) => (
                          <p key={index} className="text-dark fw-bold">
                            {t}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  
              </div>
            </div>
          );
        })}
      {loading && (
        <div className="text-center mt-4 fs-4">
          <Loading/>
        </div>
      )}
    </React.Fragment>
  );
}


function Loading()
{
    return(
        <div className="spinner-border text-primary" role="status">

        </div>
    )
}