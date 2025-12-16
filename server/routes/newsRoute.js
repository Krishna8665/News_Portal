const router = require("express").Router();
const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const {
  getPublishedNews,
  getSingleNews,
  createNews,
  publishNews,
} = require("../controller/newsController");

router.get("/", getPublishedNews);
router.get("/:slug", getSingleNews);
router.post("/", auth, admin, upload.single("image"), createNews);
router.patch("/:id/publish", auth, admin, publishNews);

module.exports = router;
