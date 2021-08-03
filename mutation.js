const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const Company = require('./models/Company')

const messageType = new GraphQLObjectType({
  name: 'MessageTypeMutation',
  description: 'Message Type Mutation',
  fields: () => ({
    message: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

const RootMutation = new GraphQLObjectType({
  name:'RootMutation',
  description: 'Root Mutation',
  fields: () => ({
    // Add Production Company.
    addProductionCompany: {
      type: messageType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve (parent, args) {
        try {
          const newProdCompany = new Company({
            name: args.name
          })
          const results = newProdCompany.save()
          return {
            message: `Data For New Production Company: ${args.name}, Was Saved Successfully`
          }
        }catch(err) {
          return {
            message: err.message
          }
        }
      }
    },
    // Update Production Company.
    updateProductionCompanyInfo: {
      type: messageType,
      args: {
        oldName: {
          type: GraphQLNonNull(GraphQLString)
        },
        newName: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve (parent, args) {
        try {
          const results = await Company.findOneAndUpdate({
            name: args.oldName
          }, {
            $set: {
              name: args.newName
            }
          })
          const message = !results ? `Production Company ${args.oldName} Was Not Found, Hence Could Not Update Production Company Name` : `Production Company Name ${args.oldName} Was Changed To ${args.oldName} Successfully!`

          return {
            message
          }
        } catch(err) {
          return {
            message: err.message
          }
        }
      }
    },
    // Delete Production Company.
    deleteProductionCompany: {
      type: messageType,
      args: {
        _id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      async resolve (parent, args) {
        try {
          const results = await Company.findOneAndDelete({
            _id: args._id
          })
          return {
            message: `Prodution Company With ID: ${args._id}, Was Deleted Successfully`
          }
        }catch(err) {
          return {
            message: err.message
          }
        }
      }
    }
  })
})

module.exports = RootMutation
