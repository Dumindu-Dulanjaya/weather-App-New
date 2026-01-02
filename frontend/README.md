# Weather App Frontend

Interactive weather data visualization for Sri Lanka weather monitoring system.

## Features

- 🗺️ Interactive map showing weather station locations
- 📊 Time-series charts for each sensor (Temperature, Humidity, Pressure, Light)
- 📍 Click on map markers to view detailed profile data
- 🔄 Real-time data from backend API
- 📱 Responsive design for mobile and desktop

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Deployment

### Deploy to Vercel (Recommended - FREE)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify (FREE)
1. Build the app: `npm run build`
2. Drag the `build` folder to [netlify.com](https://netlify.com)

## API Configuration

The app connects to: `https://weather-app-new-production.up.railway.app`

To change the API URL, edit `src/App.js`:
```javascript
const API_URL = 'your-backend-url-here';
```

## Technologies Used

- React 18
- React Leaflet (Maps)
- Chart.js (Time-series charts)
- Axios (API calls)
