const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql')
const fetch = require('node-fetch')

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  description: '...',

  fields: () => ({
    difficulty: { 
      type: GraphQLString,
      resolve: results => results.difficulty
    },
    type: { 
      type: GraphQLString,
      resolve: results => results.type
    },
    category: {
      type: GraphQLString,
      resolve: results => results.category
    },
    questionText: {
      type: GraphQLString,
      resolve: results => results.question
    },
    correctAnswer: {
      type: GraphQLString,
      resolve: results => results.correct_answer
    },
    incorrectAnswers: {
      type: new GraphQLList(GraphQLString),
      resolve: results => results.incorrect_answers
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      question: {
        type: new GraphQLList(QuestionType),
        args: {
          amount: { type: GraphQLInt },
          difficulty: { type: GraphQLString },
          type: { type: GraphQLString }
        },
        resolve: (root, args) => fetch(
        `https://opentdb.com/api.php?amount=${args.amount}&difficulty=${args.difficulty}&type=${args.type}`
        )
        .then(res => res.json())
        .then(json => json.results)
      }
    })
  })
})