const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  question: String,
  unswer: String,
  img: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Quest", QuestionSchema);
