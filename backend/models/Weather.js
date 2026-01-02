import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  timestamp: Date,
  metadata: Object,
  percentage_light_intensity: Number,
  pressure: Number,
  coordinates: Array,
  createAt: Date,
  temperature: Number,
  humidity: Number
}, { 
  strict: false
});

export default mongoose.model("weather_data", weatherSchema, "weather_data");