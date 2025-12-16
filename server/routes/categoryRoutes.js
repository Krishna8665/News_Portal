const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const {
  getCategories,
  createCategory,
} = require("../controller/catergoryController");

router.get("/", getCategories);
router.post("/", auth, admin, createCategory);
module.exports = router;

router.get;
