const jwt = require("jsonwebtoken");

class AuthService {
  static getToken() {
    return jwt.sign({ user: "somevaliduser" }, process.env.SIGNING_KEY, {
      expiresIn: "2 days",
    });
  }

  static getRefreshToken() {
    return jwt.sign({ user: "somevaliduser" }, process.env.REFRESH_KEY, {
      expiresIn: "1h",
    });
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SIGNING_KEY);
      return { user: decoded, expired: false };
    } catch (error) {
      return { user: null, expired: error.message.includes("jwt expired") };
    }
  }
}

module.exports = AuthService;
