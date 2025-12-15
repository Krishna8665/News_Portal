const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName must be provided"],
    },
    userEmail: {
      type: String,
      required: [true, "userEmail must be provided"],
    },
    userPassword: {
      type: String,
      required: [true, "Password must be provided"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
