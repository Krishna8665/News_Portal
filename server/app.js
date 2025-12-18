const express = require("express");
require("events").EventEmitter.defaultMaxListeners = 20;

const envConfig = require("./config/config");
const path = require("path");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const app = express();
require("dotenv").config()
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const corsOptions = {
  origin: "http://localhost:5173", // Vite frontend
  credentials: true, // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
//Routes Here
const authRoute = require("./routes/authRoutes");
const category = require("./routes/categoryRoutes");
const news = require("./routes/newsRoute");
app.use("", authRoute);
app.use("/categories", category);
app.use("/news", news);

//port--
const port = envConfig.portNumber || 4000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});

module.exports = app;
