const fetch = require('node-fetch')
module.exports = {
  getQuestions: args => {
    let url
    if(args.amount){
      url = `https://opentdb.com/api.php?amount=${args.amount}&difficulty=${args.difficulty}&type=${args.type}`
      return fetch(url).then(res => res.json()).then(json => json.results)
    }else{
      url = `https://opentdb.com/api.php?amount=1&difficulty=${args.difficulty}&type=${args.type}`
      return fetch(url).then(res => res.json()).then(json => json.results[0])
    }
  }
} 