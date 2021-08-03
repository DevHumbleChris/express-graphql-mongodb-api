const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// Models.
const Company = require('./models/Company')
const Movie = require('./models/Movie')

// Company Model Mutation Message Type.
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
    // Company Model Mutations.
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
          const message = !results ? `Production Company ${args.oldName} Was Not Found, Hence Could Not Update Production Company Name` : `Production Company Name ${args.oldName} Was Changed To ${args.newName} Successfully!`

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
    },

    // Movie Model Mutations.
    // Add Movie.
    addMovie: {
      type: messageType,
      args: {
        title: {
          type: GraphQLNonNull(GraphQLString)
        },
        prodCompany: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        try {
          const movie = new Movie({
            title: args.title,
            prodCompany: args.prodCompany
          })
          const results = await movie.save()
          return {
            message: `New Movie ${args.title}, Was Created Successfully`
          }
        }catch (err) {
          return {
            message: err.message
          }
        }
      }
    },
    // Update Movie Title.
    updateMovieTitle: {
      type: messageType,
      args: {
        _id: {
          type: GraphQLNonNull(GraphQLID)
        },
        title: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        try {
          const results = await Movie.findOneAndUpdate({
            _id: args._id
          }, {
            $set: {
              title: args.title
            }
          })
          const message = !results ? `Sorry No Records Were Found For Movie With ID: ${args._id}` : `Movie ID: ${args._id} Title, Was Updated Successfully`
          return {
            message
          }
        }catch (err) {
          return {
            message: err.message
          }
        }
      }
    },
    // Update Movie Title.
    updateMovieProdCompany: {
      type: messageType,
      args: {
        _id: {
          type: GraphQLNonNull(GraphQLID)
        },
        prodCompany: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parent, args) {
        try {
          const results = await Movie.findOneAndUpdate({
            _id: args._id
          }, {
            $set: {
              prodCompany: args.prodCompany
            }
          })
          const message = !results ? `Sorry No Records Were Found For Movie With ID: ${args._id}` : `Movie ID: ${args._id} Production Company, Was Updated Successfully`
          return {
            message
          }
        }catch (err) {
          return {
            message: err.message
          }
        }
      }
    },
    // Delete Movie.
    deleteMovie: {
      type: messageType,
      args: {
        _id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      async resolve (parent, args) {
        try {
          const results = await Movie.findOneAndDelete({_id: args._id})
          const message = !results ? `No Record Found For Movie With ID: ${args._id}` : `Movie ID: ${args._id} Records, Were Deleted Successfully`
          return {
            message
          }
        }catch (err) {
          return {
            message: err.message
          }
        }
      }
    }
  })
})

module.exports = RootMutation
