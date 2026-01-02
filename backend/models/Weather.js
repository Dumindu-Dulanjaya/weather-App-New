import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  profileId: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  temperature: Number,
  humidity: Number
});

export default mongoose.model("Weather", weatherSchema);
