const db = require("../models");
const User = db.User;
const { authorize } = require("../middleware/authorization");

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
  app.get("/user", authorize, async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.id },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
};
