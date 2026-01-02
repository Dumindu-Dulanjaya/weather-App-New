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

// Get latest location per profile
app.get("/api/profiles/latest", async (req, res) => {
  const data = await Weather.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$profileId",
        latest: { $first: "$$ROOT" }
      }
    }
  ]);

  res.json(data.map(d => d.latest));
});

// Get time-series data for one profile
app.get("/api/profile/:id", async (req, res) => {
  const data = await Weather.find({ profileId: req.params.id })
    .sort({ timestamp: 1 });

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});