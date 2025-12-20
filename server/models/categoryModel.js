const mongoose = require("mongoose");
const { slugify: transSlugify } = require("transliteration");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug =
      transSlugify(this.name).toLowerCase() || `category-${Date.now()}`;
  }
});

module.exports = mongoose.model("Category", categorySchema);
