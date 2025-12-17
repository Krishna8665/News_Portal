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

//PUBLISH 
exports.publishNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    news.isPublished = true;
    await news.save();

    res.json({ message: "News published" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//USER FEED 
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
