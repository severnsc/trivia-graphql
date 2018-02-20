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
      resolve: json => json.results[0].difficulty
    },
    type: { 
      type: GraphQLString,
      resolve: json => json.results[0].type
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
      }
    })
  })
})