const { connect, disconnect } = require('./db/connect')

const Quest = require("./db/Models/questionModel")
const unswers = [
  {
    question: 'Назови страну-банкира всей планеты',
    unswer: 'Швейцария',
    img:'https://nokta.md/wp-content/uploads/2020/09/stipendialnaya-programma-pravitelstva-shvejtsarii-min.jpg'
  },
  {
    question: 'Знаешь ли Ты, какое государство крупнейшее в Южной Америке?',
    unswer: 'Бразилия',
    img: 'https://img.gazeta.ru/files3/948/13613948/upload-20210530_gaf_u39_006-pic905-895x505-46415.jpg'
  },
  {
    question: 'Назови родину Олимпийских игр и марафонского бега',
    unswer: 'Греция',
    img: 'https://1prime.ru/images/83215/80/832158023.jpg'
  }
]


async function seed() {
  connect()
  return Promise.all(unswers.map((element) => Quest.create(element)))
}

seed().then(() => disconnect())

