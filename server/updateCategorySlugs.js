const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const { slugify: transSlugify } = require("transliteration");

mongoose.connect("mongodb://127.0.0.1:27017/your_db_name")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function updateSlugs() {
  const categories = await Category.find({});
  for (let cat of categories) {
    if (!cat.slug) {
      cat.slug = transSlugify(cat.name).toLowerCase();
      await cat.save();
      console.log(`Updated slug for ${cat.name} → ${cat.slug}`);
    }
  }
  console.log("Done updating slugs");
  process.exit();
}

updateSlugs();
