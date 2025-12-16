const express = require("express");
const envConfig = require("./config/config");
const connectDB = require("./config/connectDB");
const app = express();
require("dotenv");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Routes Here
const authRoute = require("./routes/authRoutes");
app.use("", authRoute);
app.use("/categories", require("./routes/category.routes"));
app.use("/news", require("./routes/news.routes"));

//port--
const port = envConfig.portNumber || 4000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});

module.exports = app;
