import './App.css';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setError('');
      setWeather(null);

      const response = await fetch(
  `https://weather-devops-project.onrender.com/weather?city=${city}`
);

      const data = await response.json();
      console.log(data);

      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1>🌤 Weather App</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>

        {weather && (
        <pre style={{ color: 'black', textAlign: 'left' }}>
        {JSON.stringify(weather, null, 2)}
       </pre>
      )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.city}</h2>
            <h3>{weather.temperature} °C</h3>
            <p>Wind Speed: {weather.windspeed}</p>
            <p>Country: {weather.country}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;