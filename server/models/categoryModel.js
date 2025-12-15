// models/Category.js
const mongoose = require('mongoose');
const slugify = require('../utils/slugify');


const categorySchema = new mongoose.Schema({
name: { type: String, unique: true },
slug: String
}, { timestamps: true });


categorySchema.pre('save', function () {
this.slug = slugify(this.name);
});


module.exports = mongoose.model('Category', categorySchema);