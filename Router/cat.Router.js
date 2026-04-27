
import express from "express";
import { Category } from "../model/category.model.db.js";
const CatRouter = express.Router();

CatRouter.get("/", (req, res) => {  
    res.render("Categories/index");
});
CatRouter.get("/categorie", (req, res) => { 
    res.render("Categories/add_category");
});

CatRouter.post("/add-category", (req, res) => { 
    const { name } = req.body;
   Category({ name }).save().then((data) => {
        res.end("Category added successfully");
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
});

CatRouter.get("/view-categorie", (req, res) => { 
    Category.find().then((data) => {
        res.render("Categories/view_category", { categories: data });
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
     
});
export default CatRouter;