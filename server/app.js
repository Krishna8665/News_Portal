const express = require("express");
const envConfig = require("./config/config");
const connectDB = require("./config/connectDB");
const app = express();
require("dotenv");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//port--
const port = envConfig.portNumber || 4000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});

module.exports = app;
