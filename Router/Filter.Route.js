
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
    res.send(data);   
});


export default filterRouter;































//   data.then((result) => {
//         if (result) {
//             res.render('fileter/addhar/index', { message: "Aadhar number already exists." });
//         } else {
//             res.render('fileter/addhar/index', { message: "Aadhar number is available." });
//         }
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }