const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const {getQuestions} = require('./utils')

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
          difficulty: { 
            type: GraphQLString,
            defaultValue: "hard",
            description: "easy, medium or hard. Defaults to hard."
          },
          type: { 
            type: GraphQLString,
            defaultValue: "boolean",
            description: "Can be 'boolean' or 'multiple'. Defaults to 'boolean. Set to empty string for a random mix of both.'"
          }
        },
        resolve: (root, args) => getQuestions(args)
      },
      questions: {
        type: new GraphQLList(QuestionType),
        args: {
          amount: { type: new GraphQLNonNull(GraphQLInt) },
          difficulty: { 
            type: GraphQLString,
            defaultValue: "hard",
            description: "easy, medium or hard. Defaults to hard."
          },
          type: { 
            type: GraphQLString,
            defaultValue: "boolean",
            description: "Can be 'boolean' or 'multiple'. Defaults to 'boolean.' Set to empty string for a random mix of both."
          }
        },
        resolve: (root, args) => getQuestions(args)
      }
    })
  })
})