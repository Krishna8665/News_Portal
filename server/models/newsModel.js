const mongoose = require("mongoose");
const slugify = require("slugify");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: { type: String },
  slug: { type: String, unique: true },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

// Generate slug automatically
newsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
      locale: "en"
    });
  }
  next();
});

module.exports = mongoose.model("News", newsSchema);
