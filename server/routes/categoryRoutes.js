const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/catergoryController");

router.get("/", getCategories);

router.post("/", authMiddleware, adminMiddleware, createCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory); // Update category by ID
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory); // Delete category by ID

module.exports = router;
