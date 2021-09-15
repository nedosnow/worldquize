const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const { connect } = require("./db/connect");
const { dbConnectionURL } = require("./db/config");
const hbs = require("hbs");
// const mongoose = require('mongoose')
const User = require("./db/Models/user.model");

const sessions = require("express-session"); // Для чтения сессии
const MongoStore = require("connect-mongo");

connect();

const indexController = require("./routes/indexRouter");
const absController = require("./routes/absRouter");
const adminController = require("./routes/adminRouter");
const { response } = require("express");
const { findOne } = require("./db/Models/user.model");

app.set("cookieName", "userCookie");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partial");

const sessionParser = sessions({
  name: app.get("cookieName"),
  secret: "fsdfsdsfdsfsdfsdfsdfs",
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  // store: new FileStore({ // выбираем в качестве хранилища файловую систему
  //   secret: secretKey,
  // }),
  store: MongoStore.create({
    // выбираем в качестве хранилища mongoDB
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    // настройки, необходимые для корректного работы cookie
    // secure: true,
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 100000000, // устанавливаем время жизни cookie
  },
});

app.use(sessionParser);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const admin = async (req, res, next) => {
  const { id: _id } = req.session.user;
  const admin = await User.findById({ _id });
  const user = req.session.user
  if (user && admin.role === "administrator") {
    next();
  } else {
    res.redirect("/");
  }
};

hbs.registerHelper("ifadmin", function(role){
 if( role === "administrator"){
   return new hbs.SafeString(`<li class="active"><a href="/admin">Редактирование <span class="sr-only">(current)</span></a></li>
   <li class="active"><a href="/abs">Игра<span class="sr-only">(current)</span></a></li>
   <li class="active"><a href="/abs/newquestion">Новый Вопрос <span class="sr-only">(current)</span></a></li>
   <li class="active"><a href="/profile">Профиль<span class="sr-only">(current)</span></a></li>
   <li class="active"><a href="/logout">Выход<span class="sr-only">(current)</span></a></li>`);
 }
});

hbs.registerHelper('forEachUser', function (user){
  if(user){
    return new hbs.SafeString(`
  <li class="active"><a href="/abs">Игра<span class="sr-only">(current)</span></a></li>
  <li class="active"><a href="/abs/newquestion">Новый Вопрос <span class="sr-only">(current)</span></a></li>
  <li class="active"><a href="/profile">Профиль<span class="sr-only">(current)</span></a></li>
  <li class="active"><a href="/logout">Выход<span class="sr-only">(current)</span></a></li> 

  `)}else{
    return new hbs.SafeString(`
    <li class="active"><a href="/login">Вход<span class="sr-only">(current)</span></a></li>
    <li class="active"><a href="/signin">Регистрация<span class="sr-only">(current)</span></a></li>`)
    }
  
})

app.use("/", indexController);
app.use("/abs", absController);
app.use("/admin", adminController);
app.use('/test',(req,res)=>{
  res.render('TEST')
} )

app.listen(PORT, () => {
  console.log("*Server here*");
});
