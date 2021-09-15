const Quest = require("../db/Models/questionModel");

const allQuestions = async (req, res) => {
  const allQuestions = await Quest.find();
  console.log(req.session);
  const user = req.session.user;
  res.render("redactQuestion", { allQuestions, user });
};

const delQuestion = async (req, res) => {
  const { id: catchId } = req.params;
  try {
    await Quest.findByIdAndDelete(catchId);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const retakeQuestion = async (req, res) => {
  const one = req.body;
  const { id: catchId } = req.params;
  try {
    const Obnowlenie = await Quest.findByIdAndUpdate(catchId, one, {
      new: true,
    });
    console.log(Obnowlenie);
    res.json(Obnowlenie);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  allQuestions,
  delQuestion,
  retakeQuestion,
};
