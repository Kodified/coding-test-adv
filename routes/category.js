const express = require("express");
const authenticatToken = require("./middleware/authenticateToken");

const AnimalService = require("./services/animals");

const router = express.Router();

/* Create new category*/
router.post("/", authenticatToken, async (req, res) => {
  try {
    const data = req.body;
    const response = await AnimalService.createCategory(data);
    res.json(response);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

/* Get all categories */
router.get("/", authenticatToken, async (req, res) => {
  try {
    const response = await AnimalService.getAllCategories();
    res.json(response);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

/* Get category by id*/
router.get("/:id", authenticatToken, async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const response = await AnimalService.getCategoryById(categoryId);
    res.json(response);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

/* Update category by id */
router.put("/:id", authenticatToken, async (req, res) => {
  try {
    const data = req.body;
    const categoryId = parseInt(req.body.id);
    const response = await AnimalService.updateCategoryById(categoryId, data);
    res.json(response);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

/* Delete category by id */
router.delete("/:id", authenticatToken, async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const response = await AnimalService.deleteCategoryById(categoryId);
    res.json(response);
  } catch (error) {
    return res.status(400).json({ error: "Service error" });
  }
});

module.exports = router;
