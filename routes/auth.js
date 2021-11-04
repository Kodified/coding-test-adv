const express = require("express");

const AuthService = require("./services/auth");

const router = express.Router();

/* Get an auth token */
router.get("/", async (req, res) => {
  const token = `Bearer ${AuthService.getToken()}`;
  res.json(token);
});

module.exports = router;
