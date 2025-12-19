const News = require("../models/newsModel");

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
    res.json(await News.find({ isPublished: true }).populate("category"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//SINGLE NEWS
exports.getSingleNews = async (req, res) => {
  try {
    res.json(
      await News.findOne({
        slug: req.params.slug,
        isPublished: true,
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
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
