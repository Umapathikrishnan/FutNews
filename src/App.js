import './App.css';
import axios from "axios"
import React, { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import Loader from "react-loader-spinner";


function App() {

  const [team,setTeam] = useState("");
  const [news,setNews] = useState([]);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    fetchdata();
  }, []);
  //starting render
  const fetchdata = async() => {
    const res = await axios.get(`https://footballnewsapi.herokuapp.com/chelsea`,{ 
      headers: {
        "Access-Control-Allow-Origin": "*"
    }});
    const datas = await res.data;
    if(datas.length > 0){
      setNews(datas)
      
    }
    setLoading(false)
  };

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
    const resp = await axios.get("https://footballnewsapi.herokuapp.com/"+team,{ 
      headers: {
        "Access-Control-Allow-Origin": "*"
    }});
    const datas = await resp.data;
    if(datas.length > 0){
      setNews(datas)
    }
    else{
      setNews([{"title":"Please enter the valid club name","url":"/"}])
    }
    console.log(news)
    //setLoading(true)
  }


  return (
    <div className="App">
    <div className="header">
      <form onSubmit={handleSubmit}>
        <div className='input-cover'>
        <input
          type="text"
          placeholder=" Search team..."
          value={team}
          onChange={event => setTeam(event.target.value)}
        />
        <button className="search-btn" type="submit">
         <img src='/bi_search.png' className="search-icon" alt='search'/>
        </button>
        </div>
      </form>
      </div>
      {isLoading?(<Loader 
    type="ThreeDots" color="#4effb4" height={80} width={80} />):
        news.map((x)=>{
          return(<div className='scroll-div' key={x.url}>
            <Card isLoading ={isLoading} title={x.title} url={x.url}/>
          </div>)
        })
      }
    </div>    
  );
}

export default App;
