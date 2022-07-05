const { User } = require("../models");

exports.getUser = async (query, value, excludePassword = true) => {
  const password = excludePassword ? "password" : "";
  const user = await User.findOne({
    where: { [query]: value },
    attributes: {
      exclude: [password],
    },
  });

  if (!user) {
    throw new Error("No user with that email");
  }

  return user;
};
