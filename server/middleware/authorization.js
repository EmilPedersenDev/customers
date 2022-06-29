const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.sendStatus(403);
  }

  try {
    const verifiedJwt = jwt.verify(token, process.env.SECRET);
    req.id = verifiedJwt.id;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
