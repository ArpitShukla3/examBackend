import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  teacher_id: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export default mongoose.model("Notification", notificationSchema);