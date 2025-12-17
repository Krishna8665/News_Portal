const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Generate slug before saving
newsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
});

module.exports = mongoose.model("News", newsSchema);
