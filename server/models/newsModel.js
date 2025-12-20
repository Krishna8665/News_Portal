const mongoose = require("mongoose");
const { slugify: transSlugify } = require("transliteration");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String },
    slug: { type: String, unique: true },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    publishedAt: Date,
  },
  { timestamps: true }
);

newsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = transSlugify(this.title).toLowerCase();
  }
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("News", newsSchema);
