const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  cards: [String],
});

module.exports = mongoose.model("User", UserSchema);
