// controllers/category.controller.js
const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
  res.json(await Category.find());
};
