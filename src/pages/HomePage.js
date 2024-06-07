import React, { useContext, useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import AuthContext from '../context/AuthContext';
import '../css/Homepage.css'; // Import CSS file

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('New York');
    const [error, setError] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  
    const API_KEY = '7fe38638647abf07b643bbe620fd55a8'; // Your API key here
  
    useEffect(() => {
      fetchWeather(location);
      const intervalId = setInterval(() => setCurrentDateTime(new Date()), 1000); // Update date and time every second
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [location]);
  
    const fetchWeather = async (location) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API key');
          }
          throw new Error('Location not found');
        }
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <div className={isDarkMode ? 'home-page-container dark-mode' : 'home-page-container light-mode'}>
        {user && <h2>Welcome, {user.name}</h2>}
        <SearchBar onSearch={setLocation} />
        <button onClick={toggleDarkMode} className="dark-mode-button">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
        <p className="date-time">{currentDateTime.toLocaleString()}</p>
        {error ? <p className="error-message">{error}</p> : <WeatherCard weather={weather} />}
      </div>
    );
  };
  
  export default HomePage;