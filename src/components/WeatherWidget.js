import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    const apiKey = '6daf034947e34b7bbde202602250108'; // Replace this
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no&`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error: {error}</div>;

  const current = weather.current;
  const location = weather.location;

  return (
    <div>
      <h3>Weather in {location.name}, {location.country}</h3>
      <p><strong>Temperature:</strong> {current.temp_c} °C</p>
      <p><strong>Condition:</strong> {current.condition.text}</p>
      <img src={current.condition.icon} alt={current.condition.text} />
      <p><strong>Humidity:</strong> {current.humidity}%</p>
    </div>
  );
};

export default WeatherWidget;
