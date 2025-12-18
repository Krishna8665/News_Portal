const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({ name: req.body.name });
    console.log("Admin user creating category:", req.user.userName);

    // Return the created category so frontend can update state
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    res.json(await Category.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
