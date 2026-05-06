import './App.css';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/weather?city=${city}`
    );

    const data = await response.json();

    setWeather(data);
  };

  return (
    <div className="app">

      <div className="weather-card">

        <h1>🌤 Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>
            Search
          </button>
        </div>

        {weather && (
          <div className="weather-info">

            <h2>
              {weather.city}
            </h2>

            <h3>
              {weather.temperature} °C
            </h3>

            <p>
              Wind Speed: {weather.windspeed}
            </p>

            <p>
              {weather.country}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;