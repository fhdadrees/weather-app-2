import { useEffect, useState } from "react";
import {
  BsSearch,
  BsCloudSunFill,
  BsFillCloudsFill,
  BsSunFill,
  BsFillCloudFogFill
} from "react-icons/bs";
import {FaCloudShowersHeavy} from "react-icons/fa"
import { WiSmoke } from "react-icons/wi";


function App() {
  const [search, setSearch] = useState("london");
  const [weatherData, setWeatherData] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();


      const {main : condition} = data.weather[0];
      const {temp, feels_like, temp_min, temp_max, humidity} = data.main
      const {speed} = data.wind
      const {name} = data

      const newData = {
        condition,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        speed,
        name
      }
      setWeatherData(newData);
      setSearch('');
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const weather = () => {
  
  if(weatherData?.condition == 'Clouds') {
     return <BsFillCloudsFill size={120} />
  } else if (weatherData?.condition == 'Haze') {
    return <BsFillCloudFogFill size={120} />
  } else if (weatherData?.condition == 'Clear') {
    return <BsSunFill size={120} />
  } else if (weatherData?.condition == 'Rain') {
    return <FaCloudShowersHeavy size={120} />
  } else if (weatherData?.condition == 'Smoke') {
    return <WiSmoke size={120} />
  } else {
    return <BsSunFill size={120} />
  }
  
};

  return (
    <div className="w-full h-screen min-h-[500px] bg-slate-900 flex justify-center items-center text-xl">
      <div className="w-[500px] h-[700px] bg-slate-200 rounded-xl flex flex-col justify-between p-6">
        <div className="flex justify-center items-center bg-white rounded-xl overflow-hidden">
          <input
            type="search"
            className="p-3 w-full border-none outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className=" bg-slate-500 hover:bg-slate-700 w-16 h-14 flex justify-center items-center "
            onClick={getWeatherInfo}
          >
            <BsSearch size={30} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 h-64">
        <h2 className="text-3xl capitalize">{weatherData.name}</h2>
          <div className="flex flex-col gap-3 justify-center items-center">
            {weather()}
            <h1 className="text-5xl font-bold">{typeof weatherData.temp === 'number' && weatherData.temp.toFixed()}&deg;</h1>
          </div>
          <div className="flex gap-10">
            <h3>{typeof weatherData.temp_min === 'number' && weatherData.temp_min.toFixed()}&deg;</h3>
            <h3>{typeof weatherData.temp_max === 'number' && weatherData.temp_max.toFixed()}&deg;</h3>
          </div>
          <div>
            <p className="text-2xl">{weatherData.condition}</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly h-32 border-t-4 border-slate-700">
          <div className="text-center">
            <h3>Feels like</h3>
            <p>{typeof weatherData.feels_like === 'number' && weatherData.feels_like.toFixed()}&deg;</p>
          </div>
          <div className="text-center">
            <h3>Humidity</h3>
            <p className="">{weatherData.humidity}</p>
          </div>
          <div className="text-center">
            <h3>Wind</h3>
            <p>55</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App
