const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, password, firstname, lastname } = req.body;

      if (!email || !password || !firstname || !lastname) {
        throw new Error("Missing user information");
      }

      const user = await User.findOne({ where: { email: email } });

      if (user) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: newPassword,
      });

      return res.status(200).json({
        message: "User created!",
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  app.get("/setcookie", (req, res) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
      httpOnly: true,
    });
    res.send("Cookie have been saved successfully");
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("No email or password provided");
      }

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new Error("No user with that email");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error("Wrong password");
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hrs
      });

      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const hour = 3600000;
      const week = 7 * 24 * hour;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: week,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .send({
          user: userResponse,
          message: "Logged in successfully",
        });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
};
