import mongoose from "mongoose";

const stayUserSchema = new mongoose.Schema({
  Phone_No: Number,
  Number_of_People: Number,
  key: String,

  People: [
    {
      Name: String,
      Aadhar_No: String, // keep string (Aadhar can be large)
      Age: Number,
    }
  ]
});

export const StayUser = mongoose.model("StayUser", stayUserSchema);