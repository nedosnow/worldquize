const Quest = require("../db/Models/questionModel");

const renderAbs = async (req, res) => {
  const allUsers = req.session.user;
  const user = req.session.user;
  const question = await Quest.findOne();
  res.render("abs", { question, allUsers, user });
};

const renderQuestion = async (req, res) => {
  const unswerFromClient = req.body.formData.unswer;

  const questions = await Quest.find();
  let ind = req.body.index;
  if (unswerFromClient === questions[ind - 1].unswer) {
    res.json({ question: questions[ind], image: questions[ind - 1].img });
  } else {
    res.json({ question: questions[ind] });
  }
};

const createNewQuestion = (req, res) => {
  const allUsers = req.session.user;
  const user = req.session.user;
  res.render("newquestion", { allUsers, user });
};
const addNewQuestion = async (req, res) => {
  const dataFromClient = req.body;
  const newQuest = await Quest.create(dataFromClient);
  res.redirect("/");
};

module.exports = {
  renderAbs,
  createNewQuestion,
  addNewQuestion,
  renderQuestion,
};
