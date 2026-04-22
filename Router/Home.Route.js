import express from "express";
import { dataEntry } from "../model/uses.detail.db.js";
const HomeRouter = express.Router();

HomeRouter.get("/", (req, res) => {
  res.render("index");
});

HomeRouter.get("/in", (req, res) => {
  res.render("Check_In/index");
});

HomeRouter.post("/check-in", (req, res) => {
  const { name, aadhar, phone, people, reason, start_date, end_date } = req.body;
  new dataEntry({
    Name: name,
    Aadhar_No: aadhar,
    Phone_No: phone,
    Number_of_People: people,
    Why_choose_this_hotel: reason,
    Start_Date: start_date,
    End_Date: end_date
  }).save();
  res.render("Check_In/user_detail_enter", { people });
});

HomeRouter.post("/submit", (req, res) => {
  const total = req.body.total;

  for (let i = 0; i < total; i++) {
   const Name =  req.body["name" + i];
   const aadhar = req.body["aadhar" + i];
   const age = req.body["age" + i];

   if(!Name || !aadhar || !age){
    return res.status(400).send("All fields are required");
  } else if (isNaN(aadhar) || isNaN(age)) {
    return res.status(400).send("Aadhar and age must be numbers");
  } 

  }
  res.send("Done");
});

export default HomeRouter;
