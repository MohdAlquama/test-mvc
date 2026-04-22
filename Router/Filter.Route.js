
import express from "express";
const filterRouter = express.Router();

filterRouter.get("/", (req, res) => {
    res.render('fileter/mainpage')
});
filterRouter.get("/addhar", (req, res) => {
    res.render('fileter/addhar/index')
});

export default filterRouter;