import express from "express";
const HomeRouter = express.Router();

HomeRouter.get("/", (req, res) => {
  res.render("index");
});

HomeRouter.get("/in", (req, res) => {
  res.render("Check_In/index");
});

HomeRouter.post("/check-in", (req, res) => {
  const { name, aadhar, phone, people, reason, start_date, end_date } = req.body;
  res.render("Check_In/user_detail_enter", { people });
});

export default HomeRouter;
