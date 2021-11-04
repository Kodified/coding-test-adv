const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth");

function authenticateToken(req, res, next) {
  const bearerToken = req.headers["authorization"].split(" ");
  const authToken = bearerToken[1];
  if (authToken == null) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }

  const session = AuthService.verifyToken(authToken);
  if (!session.user) {
    return res.status(403).json({ error: "Invalid Authorization Token" });
  }
  req.session = session;
  next();
}
module.exports = authenticateToken;
