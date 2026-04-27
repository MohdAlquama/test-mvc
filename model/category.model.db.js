import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Category = mongoose.model("Category", categorySchema);