import { useState , useEffect} from "react";
function App() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const fetchWeather = async () => {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability");
  const data = await response.json();
  setWeatherData(data);
};

return (
  );
}

export default App;