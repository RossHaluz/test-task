const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");

const checkAuth = (req, res, next) => {
  const authHedear = req.headers.authorization;

  if (!authHedear) {
    return next(httpError(401, "Unouthorized"));
  }

  const [bearer, token] = authHedear.split(" ", 2);

  if (!token || bearer !== "Bearer") {
    return next(httpError(401, "Unouthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(httpError(401, "Unouthorized"));
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  checkAuth,
};
