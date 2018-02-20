const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => {
      
    }
  })
})