import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './ProfileDetails.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfileDetails = ({ profile, onClose }) => {
  if (!profile || !profile.data || profile.data.length === 0) {
    return null;
  }

  const sortedData = [...profile.data].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );

  const labels = sortedData.map(d => 
    new Date(d.timestamp).toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  );

  const temperatureData = {
    labels,
    datasets: [{
      label: 'Temperature (°C)',
      data: sortedData.map(d => d.temperature || 0),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const humidityData = {
    labels,
    datasets: [{
      label: 'Humidity (%)',
      data: sortedData.map(d => d.humidity || 0),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.2)',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const pressureData = {
    labels,
    datasets: [{
      label: 'Pressure (hPa)',
      data: sortedData.map(d => d.pressure || 0),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const lightData = {
    labels,
    datasets: [{
      label: 'Light Intensity (%)',
      data: sortedData.map(d => d.percentage_light_intensity !== undefined && d.percentage_light_intensity !== null ? d.percentage_light_intensity : 0),
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.2)',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#00f5ff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 12, 41, 0.95)',
        titleColor: '#00f5ff',
        bodyColor: '#ffffff',
        borderColor: '#00f5ff',
        borderWidth: 1,
        padding: 12,
        displayColors: true
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 10
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 10
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="profile-details-overlay" onClick={onClose}>
      <div className="profile-details-container" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <h2>📊 Profile: {profile.id}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="details-content">
          <div className="chart-grid">
            <div className="chart-card">
              <h3>🌡️ Temperature Time Series</h3>
              <div className="chart-wrapper">
                <Line data={temperatureData} options={options} />
              </div>
            </div>

            <div className="chart-card">
              <h3>💧 Humidity Time Series</h3>
              <div className="chart-wrapper">
                <Line data={humidityData} options={options} />
              </div>
            </div>

            <div className="chart-card">
              <h3>🔽 Pressure Time Series</h3>
              <div className="chart-wrapper">
                <Line data={pressureData} options={options} />
              </div>
            </div>

            <div className="chart-card">
              <h3>💡 Light Intensity Time Series</h3>
              <div className="chart-wrapper">
                <Line data={lightData} options={options} />
              </div>
            </div>
          </div>

          <div className="data-summary">
            <h3>📈 Data Summary</h3>
            <p><strong>Total Records:</strong> {sortedData.length}</p>
            <p><strong>Time Range:</strong> {new Date(sortedData[0].timestamp).toLocaleString()} - {new Date(sortedData[sortedData.length - 1].timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
