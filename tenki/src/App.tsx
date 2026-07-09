import { useState } from "react"
import "App.css"

// 1品目：これがオリジナル型（設計図）です！生JSONを型定義に直しました。
interface WeatherData {
  latitude: number;
  timezone: string;
  hourly: {
    temperature_2m: number[];
    precipitation_probability: number[];
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability"
    );
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>お天気ダッシュボード</h1>
      <button onClick={fetchWeather}>天気を取得</button>

      {/* データがあるときだけ表示する */}
      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>取得したデータ</h2>
          <p>緯度: {weatherData.latitude}</p>
          <p>タイムゾーン: {weatherData.timezone}</p>
          <p>最初の1時間の気温: {weatherData.hourly.temperature_2m[0]} ℃</p>
          <p>最初の1時間の降水確率: {weatherData.hourly.precipitation_probability[0]} %</p>
        </div>
      )}
    </div>
  );
}

export default App;
