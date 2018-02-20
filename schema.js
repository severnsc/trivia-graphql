const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  description: '...',

  fields: () => ({
    difficulty: { type: GraphQLString }
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
          difficulty: { type: GraphQLString },
          type: { type: GraphQLString }
        }
      }
    })
  })
})