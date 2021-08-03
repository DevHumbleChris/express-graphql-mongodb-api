const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const RootMutation = require('./mutation')
const Company = require('./models/Company')

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  description: 'Company Type Query Schema',
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

const RootQuerySchema = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query Schema',
  fields: () => ({
    company: {
      type: new GraphQLList(CompanyType),
      async resolve () {
        try {
          const results = await Company.find({}).select('id name')
          return results
        }catch(err) {
          console.log(err.message)
        }
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQuerySchema,
  mutation: RootMutation
})

module.exports = schema
