import express from "express";
import { dataEntry } from "../model/uses.detail.db.js";
import { StayUser } from "../model/stay.user.db.js";

const BookingRouter = express.Router();
BookingRouter.get("/", (req, res) => {
  dataEntry.find().then((data) => {
      res.render("Booking/page1", { x: data });
 }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

BookingRouter.get("/view/:key", (req, res) => {
  const { key } = req.params;
  StayUser.findOne({ key: key }).then((data) => {
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.render("Booking/page2", { x: data });
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

 


export default BookingRouter;