const Quest = require("../db/Models/questionModel");
const User = require("../db/Models/user.model");
const router = require("../routes/indexRouter");

const renderIndex = async (req, res) => {
  try {
    const user = req.session.user;
    console.log(user);
    const allQuestions = await Quest.find();
    res.render("index", { allQuestions, user });
  } catch (error) {
    console.log(error);
  }
};


const resultSerch = async(req,res)=>{
// console.log(req.body);
// const tofindinbase = req.body
// const allQuestions = await Quest.find();
// const questionsToSerchValues = await Object.values(allQuestions)

//   for(tofindinbase.question in allQuestions){
//     console.log(allQuestions.question[tofindinbase.question])
//   }


}


const signin = async (req, res) => {
  res.render("signin");
};

const addNewUser = async (req, res) => {
  const dataFromClient = req.body; // nickName, email, password
  const newUser = await User.create(dataFromClient);
  req.session.user = {
    id: newUser._id,
    // role: currentUser.role,
    // nickName: currentUser.nickName,
  };
  res.redirect("/");
};

const login = async (req, res) => {
  res.render("login");
};

const interInLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email && password) {
    const currentUser = await User.findOne({ email, password });
    if (currentUser) {
      req.session.user = {
        id: currentUser._id,
        role: currentUser.role,
        nickName: currentUser.nickName,
      };
      return res.redirect("/");
    }
  }
  return res.redirect("/signin");
};

const profileShow = async (req, res) => {
  console.log(req.session);
  const user = req.session.user;
  const { id } = req.session.user;
  const profileData = await User.findById(id);
  res.render("profile", { profileData, user });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get("cookieName"));
  res.redirect("/signin");
};

module.exports = {
  renderIndex,
  profileShow,
  signin,
  addNewUser,
  login,
  interInLogin,
  logout,
  resultSerch
};
