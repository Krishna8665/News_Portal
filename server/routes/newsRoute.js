const router = require("express").Router();
const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const {
  getPublishedNews,
  getSingleNews,
  createNews,
  publishNews,
  getDraftNews,
  deleteNews,
  getTrendingNews,
  getNewsByCategory,
} = require("../controller/newsController");

router.get("/", getPublishedNews);
router.get("/drafts", auth, admin, getDraftNews);

router.get("/news/:year/:month/:slug", getSingleNews);
router.post("/", auth, admin, upload.single("image"), createNews);
router.patch("/:id/publish", auth, admin, publishNews);
router.get("/trending", getTrendingNews);
router.get("/getNewsByCategory", getNewsByCategory);
// routes/newsRoute.js

// Add DELETE endpoint
router.delete("/:id", auth, admin, deleteNews);

module.exports = router;
