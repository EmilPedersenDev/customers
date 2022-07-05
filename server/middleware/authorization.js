const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({ message: "jwt expired" });
  }

  try {
    const verifiedJwt = jwt.verify(token, process.env.SECRET);
    req.id = verifiedJwt.id;
    return next();
  } catch (err) {
    return res.status(401).send({ message: "jwt expired" });
  }
};
