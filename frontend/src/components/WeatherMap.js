import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const WeatherMap = ({ profiles, onProfileClick, selectedProfileId }) => {
  // Sri Lanka center coordinates
  const center = [7.8731, 80.7718];

  const getCoordinates = (profile) => {
    if (profile.coordinates && Array.isArray(profile.coordinates) && profile.coordinates.length === 2) {
      // Database stores [lat, lng], Leaflet needs [lat, lng]
      return [profile.coordinates[0], profile.coordinates[1]]; // No swap needed
    }
    if (profile.latitude && profile.longitude) {
      return [profile.latitude, profile.longitude];
    }
    return null;
  };

  // Debug logging
  console.log('Total profiles:', profiles.length);
  if (profiles.length > 0) {
    console.log('Sample profile:', profiles[0]);
    console.log('Sample coordinates:', getCoordinates(profiles[0]));
  }

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={8} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {profiles.map((profile, index) => {
          const coords = getCoordinates(profile);
          if (!coords) return null;

          return (
            <Marker 
              key={profile.profileId || profile._id || index}
              position={coords}
              eventHandlers={{
                click: () => onProfileClick(profile.profileId || profile._id)
              }}
            >
              <Popup>
                <div className="popup-content">
                  <h3>Profile: {profile.profileId || 'Unknown'}</h3>
                  <p><strong>🌡️ Temperature:</strong> {profile.temperature}°C</p>
                  <p><strong>💧 Humidity:</strong> {profile.humidity}%</p>
                  <p><strong>🔽 Pressure:</strong> {profile.pressure} hPa</p>
                  {profile.percentage_light_intensity && (
                    <p><strong>💡 Light:</strong> {profile.percentage_light_intensity}%</p>
                  )}
                  <p><strong>📅 Time:</strong> {new Date(profile.timestamp).toLocaleString()}</p>
                  <button 
                    onClick={() => onProfileClick(profile.profileId || profile._id)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
