import mongoose from "mongoose";
const TrendSchema = new mongoose.Schema({
    uniqueId: String,
    trends: [String],
    timestamp: Date,
    ipAddress: String,
  });
export default mongoose.model('TrendSchema',TrendSchema)