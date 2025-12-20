const News = require("../models/newsModel");
const paginate = require("../utils/pagination");

//CREATE DRAFT
exports.createNews = async (req, res) => {
  try {
    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.file?.filename,
      isPublished: false,
    });

    res.status(201).json({ message: "Saved as draft", news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET DRAFT NEWS (ADMIN)
exports.getDraftNews = async (req, res) => {
  try {
    const drafts = await News.find({ isPublished: false })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(drafts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//PUBLISH Draft-> News
exports.publishNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: true,
        publishedAt: new Date(),
      },
      { new: true }
    );

    res.json({ message: "News published", news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//USER FEED-Get News
exports.getPublishedNews = async (req, res) => {
  try {
    const result = await paginate(
      News,
      { isPublished: true },
      {
        page: req.query.page,
        limit: req.query.limit,
        sort: { publishedAt: -1 },
        populate: "category",
      }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//SINGLE NEWS
exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("category");

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE NEWS
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//trending news
exports.getTrendingNews = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const result = await paginate(
      News,
      {
        isPublished: true,
        publishedAt: { $gte: fromDate },
      },
      {
        page: req.query.page,
        limit: req.query.limit || 6,
        sort: { views: -1 },
        populate: "category",
      }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get news by category
exports.getNewsByCategory = async (req, res) => {
  try {
    const result = await paginate(
      News,
      { isPublished: true, category: req.params.categoryId },
      {
        page: req.query.page,
        limit: req.query.limit,
        sort: { publishedAt: -1 },
        populate: "category",
      }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
