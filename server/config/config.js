const { config } = require("dotenv");
config();

module.exports = {
  portNumber: process.env.PORT,
  mongodbString: process.env.MONGODB_URL,
  backendUrl: process.env.BACKEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
