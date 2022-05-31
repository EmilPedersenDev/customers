const db = require("../models");
const User = db.User;

module.exports = (app) => {
  app.post("/user", async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      const user = await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  app.get("/user", (req, res) => {
    res.json({
      message: "User",
    });
  });
};
