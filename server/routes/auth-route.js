const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validatePassword,
  newToken,
  newPassword,
  verifyRefreshToken,
  clearCookies,
} = require("../service/auth-service");
const { getUser } = require("../service/user-service");
const { User } = require("../models");
const { week, month } = require("../common/index");

module.exports = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, password, firstname, lastname } = req.body;

      if (!email || !password || !firstname || !lastname) {
        throw new Error("Missing user information");
      }

      const user = await User.findOne({
        where: { email: email },
      });

      if (user) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      return res.status(200).json({
        message: "User created!",
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("No email or password provided");
      }

      const user = await getUser("email", email, false);

      await validatePassword(password, user.password);

      const accesToken = newToken({ id: user.id }, "10000");

      const refreshToken = newToken({ id: user.id }, "20000");

      const accessTokenResponse = Buffer.from(
        accesToken.split(".")[1],
        "base64"
      ).toString();

      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return res
        .status(200)
        .cookie("access_token", accesToken, {
          httpOnly: true,
          path: "/",
          maxAge: week,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/",
          maxAge: month,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .send({
          user: userResponse,
          claims: accessTokenResponse,
          message: "Logged in successfully",
        });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  app.get("/refresh-token", async (req, res) => {
    try {
      const verifiedRefreshToken = await verifyRefreshToken(req, res);
      const user = await getUser("id", verifiedRefreshToken.id);
      const accesToken = newToken({ id: user.id }, "10000");

      const accessTokenResponse = Buffer.from(
        accesToken.split(".")[1],
        "base64"
      ).toString();

      return res
        .status(200)
        .cookie("access_token", accesToken, {
          httpOnly: true,
          path: "/",
          maxAge: week,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .send({
          claims: accessTokenResponse,
          message: "Access token created succesfully",
        });
    } catch (err) {
      clearCookies(res);
    }
  });
};
