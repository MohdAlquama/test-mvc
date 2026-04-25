import express from "express";
import { dataEntry } from "../model/uses.detail.db.js";
import { StayUser } from "../model/stay.user.db.js";
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
  res.render("Check_In/user_detail_enter", { people  , aadhar , phone});
});

HomeRouter.post("/submit", async (req, res) => {
  const total = parseInt(req.body.total);
  const aadharkey = req.body.aadhar;
  const phonekey = req.body.phone;
  let people = []; //array
  for (let i = 0; i < total; i++) {
    const name = req.body["name" + i];
    const aadhar = req.body["aadhar" + i];
    const age = req.body["age" + i];

    people.push({
      Name: name,
      Aadhar_No: aadhar,
      Age: age
    });
  }
  try {
    let str = aadharkey + phonekey;
    console.log(str);
    await StayUser({
      Phone_No: phonekey,
      Number_of_People: total,
      People: people,
      key: str
    }).save();
    res.send("Done");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

export default HomeRouter;
