import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherMap from './components/WeatherMap';
import ProfileDetails from './components/ProfileDetails';
import './App.css';

// Use local backend for development, deployed backend for production
const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://weather-app-new-production.up.railway.app'
    : 'http://localhost:5000');

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchLatestProfiles();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchLatestProfiles();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchLatestProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/profiles/latest`);
      setProfiles(response.data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load weather data. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = async (profileId) => {
    try {
      const response = await axios.get(`${API_URL}/api/profile/${profileId}`);
      setSelectedProfile({
        id: profileId,
        data: response.data
      });
    } catch (err) {
      console.error('Error fetching profile details:', err);
      setError('Failed to load profile details.');
    }
  };

  const handleCloseDetails = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌦️ Sri Lanka Weather Data Map</h1>
        <p>Interactive Weather Monitoring System • Live Updates</p>
      </header>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button onClick={fetchLatestProfiles}>🔄 Retry Connection</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <WeatherMap 
            profiles={profiles} 
            onProfileClick={handleProfileClick}
            selectedProfileId={selectedProfile?.id}
          />

          {selectedProfile && (
            <ProfileDetails 
              profile={selectedProfile}
              onClose={handleCloseDetails}
            />
          )}

          <div className="stats-bar">
            <div className="stat">
              <span className="stat-label">Active Profiles</span>
              <span className="stat-value">{profiles.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Last Updated</span>
              <span className="stat-value">{lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
