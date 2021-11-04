const express = require("express");

const { parseArrayItemsToInt } = require("../utils/helper");
const authenticatToken = require("./middleware/authenticateToken");

const AnimalService = require("./services/animals");
const router = express.Router();

/* Get all animals */
router.get("/", authenticatToken, async (req, res) => {
  try {
    const animals = await AnimalService.getAllAnimals();
    res.json(animals);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

/* Get all animals by category ids */
router.post("/categoryIds", authenticatToken, async (req, res) => {
  console.log(req.body);
  try {
    if (req.body && req.body.data.length) {
      const categoryIds = parseArrayItemsToInt(req.body.data);
      const response = await AnimalService.getAnimalsByCategoryIds(categoryIds);
      res.json(response);
    } else {
      const response = await AnimalService.getAllAnimals();
      res.json(response);
    }
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

module.exports = router;
