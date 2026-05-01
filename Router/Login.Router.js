import bcrypt from "bcrypt";
import express from "express";
import { validationResult , body } from "express-validator";
import accountModel from "../model/account.model.js";

const LoginRouter = express.Router();

LoginRouter.get("/",(req,res)=>{
    res.render("login/singin");
});

LoginRouter.get("/login", (req, res) => {
  res.render("login/login");
});

LoginRouter.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login/singin", {
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const existing = await accountModel.findOne({ email });
      if (existing) {
        return res.status(400).render("login/singin", {
          errors: [{ msg: "Email already exists" }],
        });
      }

      const newUser = new accountModel({ email, password });
      await newUser.save(); // password will auto-hash

      req.session.user = {
        id: newUser._id.toString(),
        email: newUser.email,
      };

      const redirectTo = req.session.returnTo || "/";
      delete req.session.returnTo;
      res.redirect(redirectTo);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

LoginRouter.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login/login", {
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await accountModel.findOne({ email });
      if (!user) {
        return res.status(401).render("login/login", {
          errors: [{ msg: "Invalid email or password" }],
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).render("login/login", {
          errors: [{ msg: "Invalid email or password" }],
        });
      }

      req.session.user = {
        id: user._id.toString(),
        email: user.email,
      };

      const redirectTo = req.session.returnTo || "/";
      delete req.session.returnTo;
      res.redirect(redirectTo);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

LoginRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/account/login");
  });
});

export default LoginRouter;
