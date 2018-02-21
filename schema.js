const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const fetch = require('node-fetch')

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  description: '...',

  fields: () => ({
    difficulty: { 
      type: GraphQLString,
      resolve: result => result.difficulty
    },
    type: { 
      type: GraphQLString,
      resolve: result => result.type
    },
    category: {
      type: GraphQLString,
      resolve: result => result.category
    },
    questionText: {
      type: GraphQLString,
      resolve: result => result.question
    },
    correctAnswer: {
      type: GraphQLString,
      resolve: result => result.correct_answer
    },
    incorrectAnswers: {
      type: new GraphQLList(GraphQLString),
      resolve: result => result.incorrect_answers
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      question: {
        type: QuestionType,
        args: {
          difficulty: { type: GraphQLString, defaultValue: "hard" },
          type: { type: GraphQLString, defaultValue: "boolean" }
        },
        resolve: (root, args) => fetch(
          `https://opentdb.com/api.php?amount=1&difficulty=${args.difficulty}&type=${args.type}`
        )
        .then(res => res.json())
        .then(json => json.results[0])
      },
      questions: {
        type: new GraphQLList(QuestionType),
        args: {
          amount: { type: new GraphQLNonNull(GraphQLInt) },
          difficulty: { type: GraphQLString, defaultValue: "hard" },
          type: { type: GraphQLString, defaultValue: "boolean" }
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