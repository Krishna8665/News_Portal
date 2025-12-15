// controllers/news.controller.js
const News = require("../models/News");

// Admin creates draft
exports.createNews = async (req, res) => {
  const news = await News.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.file?.filename,
    isPublished: false,
  });
  res.status(201).json({ message: "Saved as draft", news });
};

// Admin publishes news
exports.publishNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  news.isPublished = true;
  await news.save();
  res.json({ message: "News published" });
};

// User feed
exports.getPublishedNews = async (req, res) => {
  res.json(await News.find({ isPublished: true }).populate("category"));
};

// Single news
exports.getSingleNews = async (req, res) => {
  res.json(await News.findOne({ slug: req.params.slug, isPublished: true }));
};
