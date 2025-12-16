// models/News.js
const mongoose = require('mongoose');
const slugify = require('../utils/slugify');


const newsSchema = new mongoose.Schema({
title: String,
slug: { type: String, unique: true },
description: String,
image: String,
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
isPublished: { type: Boolean, default: false }
}, { timestamps: true });


newsSchema.pre('save', function () {
this.slug = slugify(this.title);
});


module.exports = mongoose.model('News', newsSchema);