import mongoose from "mongoose";
const UsesDetailSchema = new mongoose.Schema({
    
Name: String,

Aadhar_No: Number,

Phone_No: Number,

Number_of_People: Number,

Why_choose_this_hotel: String,

Start_Date: Date,

End_Date: Date


});     
export const dataEntry = mongoose.model("UsesDetail", UsesDetailSchema);