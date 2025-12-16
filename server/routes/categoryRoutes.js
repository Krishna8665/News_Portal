const router = require("express").Router();
const auth = require("../middleware/admin.middleware");
const admin = require("../middleware/admin.middleware");
const {
  getCategories,
  createCategory,
} = require("../controller/catergoryController");

router.get("/", getCategories);
router.post("/", auth, admin, createCategory);
module.exports = router;

router.get;
