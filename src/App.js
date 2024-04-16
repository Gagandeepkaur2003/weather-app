import { CircularProgress, Slide, TextField } from "@mui/material";

import { useEffect,useState } from "react";
import './App.css';

function App() {

  const[cityName,setCityName] = useState("Rajpura");

  const[inputText,setInputText] = useState("");

  const [data,setData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3f941da28f19d4d3b1f1515ca35fd231`
    )

    .then((res)=>{
      if(res.status === 200)
      {
        error && setError(false);
        return res.json();
      }
      else
      {
        throw new Error("Something Went wrong");
      }
    })

    .then((data)=>{
      setData(data);
    })
    .catch(()=>setError(true))
    .finally(()=> setLoading(false));

  },[cityName,error]);

  const handleSearch=(e)=>{
    if(e.key === "Enter")
    {
      setCityName(e.target.value);
      // setCityName.inputText("");
      setInputText("");
    }
  };
  
  return (
    <div className="bg_img">
      {
        !loading ? (
            <>
            <TextField variant = "filled" 
            label="Search location" className="input" 
      error={error}
      value={inputText} 
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={handleSearch}
      />
      <h1 className="city">{data.name}</h1>
      <div className="group">
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        <h1>${data.weather[0].main}</h1>
      </div>

      <h1 className="temp">{(data.main.temp - 273.15).toFixed()}°C</h1>
      <Slide direction="right" timeout={800} in={!loading}>
        <div className="box_container">
        <div className="box">
          <p>Humidity</p>
          <h1>{data.main.humidity.toFixed()}%</h1>
        </div>

        <div className="box">
        <p>Wind</p>
          <h1>{data.wind.speed.toFixed()}km/hr</h1>
        </div>
 
        <div className="box">
        <p>Feels Like</p>
          <h1>{Math.round(data.main.feels_like - 273.15)}°C</h1>
        </div>
      </div>

      </Slide>
            </>

        ):(
          <CircularProgress/>
        )

      }
    </div>
  );
}

export default App;
