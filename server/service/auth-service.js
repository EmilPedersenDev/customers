const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.validatePassword = async (reqPassword, savedPassword) => {
  const validPassword = await bcrypt.compare(reqPassword, savedPassword);

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  return validPassword;
};

exports.newToken = (payload, expiration) => {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: expiration,
  });

  return token;
};

exports.newPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

exports.verifyRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  const verifiedRefreshToken = jwt.verify(refreshToken, process.env.SECRET);

  if (verifiedRefreshToken) {
    return verifiedRefreshToken;
  } else {
    throw new Error("no valid refresh token");
  }
};

const clearCookies = (res) => {
  return res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .status(401)
    .send({ message: "Session expired" });
};

exports.clearCookies = clearCookies;
