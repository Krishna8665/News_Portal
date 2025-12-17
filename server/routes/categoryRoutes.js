const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {
  getCategories,
  createCategory,
} = require("../controller/catergoryController");

router.get("/", getCategories);

router.post("/", authMiddleware, adminMiddleware, createCategory);

module.exports = router;
