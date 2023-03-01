const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  // orders: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Orders",
  //     required: true,
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);
