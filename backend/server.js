import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Weather from "./models/Weather.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Root endpoint - API information
app.get("/", (req, res) => {
  res.json({
    name: "Sri Lanka Weather Data API",
    version: "1.0.0",
    status: "Running",
    endpoints: {
      latestProfiles: "/api/profiles/latest",
      profileData: "/api/profile/:id"
    },
    deployment: {
      platform: "AWS EC2 Ubuntu",
      database: "MongoDB Atlas",
      processManager: "PM2"
    }
  });
});

// Get latest location per profile (using coordinates)
app.get("/api/profiles/latest", async (req, res) => {
  try {
    // Get all unique coordinate pairs and their latest data
    const data = await Weather.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: { 
            lat: { $arrayElemAt: ["$coordinates", 0] },  // First element is latitude
            lng: { $arrayElemAt: ["$coordinates", 1] }   // Second element is longitude
          },
          latest: { $first: "$$ROOT" }
        }
      },
      { $limit: 5 }
    ]);

    const profiles = data.map(d => ({
      ...d.latest,
      profileId: d._id.lat + "_" + d._id.lng
    }));

    res.json(profiles);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get time-series data for one profile
app.get("/api/profile/:id", async (req, res) => {
  try {
    // Extract lat/lng from profileId
    const [lat, lng] = req.params.id.split('_').map(Number);
    
    const data = await Weather.find({ 
      coordinates: { $exists: true }
    }).sort({ timestamp: 1 });
    
    // Filter by matching coordinates
    const filtered = data.filter(doc => {
      if (doc.coordinates && doc.coordinates.length === 2) {
        return Math.abs(doc.coordinates[0] - lat) < 0.0001 && 
               Math.abs(doc.coordinates[1] - lng) < 0.0001;
      }
      return false;
    });

    res.json(filtered);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});