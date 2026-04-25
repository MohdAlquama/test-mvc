
import express from "express";
import { dataEntry } from "../model/uses.detail.db.js";
const filterRouter = express.Router();

filterRouter.get("/", (req, res) => {
    res.render('fileter/mainpage')
});
filterRouter.get("/addhar", (req, res) => {
    res.render('fileter/addhar/index')
});


filterRouter.post('/addhar', async(req, res) => {
    const aadhar = req.body.aadhar;
    const data =  await dataEntry.find({ Aadhar_No: aadhar });
    res.json(data);
});


export default filterRouter;


