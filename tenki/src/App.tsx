import { useState } from "react";
import "./App.css";

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
  // 位置情報の取得中などを表すステータス（おまけ）
  const [loading, setLoading] = useState(false);

  const fetchWeatherWithCurrentLocation = () => {
    setLoading(true);

    // 🌐 ブラウザの機能で現在地（緯度・経度）を取得する
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // 取得した現在地をURLに埋め込む！日本のタイムゾーンも指定
        const url = `https://open-meteo.com{latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability&timezone=Asia%2FTokyo`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("データの取得に失敗しました", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("位置情報の取得に失敗しました", error);
        alert("位置情報の取得を許可してください。");
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>現在地のお天気ダッシュボード</h1>
      
      <button onClick={fetchWeatherWithCurrentLocation} disabled={loading}>
        {loading ? "位置情報を取得中..." : "現在地の天気を取得"}
      </button>

      {weatherData && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>現在の場所のデータ</h2>
          <p>⏳ タイムゾーン: {weatherData.timezone}</p>
          <p>📍 取得した緯度: {weatherData.latitude.toFixed(2)}</p>
          <p>🌡️ 今（最初の1時間）の気温: {weatherData.hourly.temperature_2m[0]} ℃</p>
          <p>☔ 降水確率: {weatherData.hourly.precipitation_probability[0]} %</p>
        </div>
      )}
    </div>
  );
}

export default App;
