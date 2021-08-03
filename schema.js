const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// Root Mutation.
const RootMutation = require('./mutation')

// Models
const Company = require('./models/Company')
const Movie = require('./models/Movie')

// Schema Object Types
const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  description: 'Company Type Query Schema',
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    movies: {
      type: new GraphQLList(movieType),
      async resolve (Company) {
        try {
          const movies = await Movie.find({}).select('id title prodCompany')
          const results = movies.filter((movie) => movie.prodCompany === Company.name)
          return results
        }catch(err) {
          console.log(err.message)
        }
      }
    }
  })
})

const movieType = new GraphQLObjectType({
  name: 'MovieTypeMutation',
  description: 'Movie Type Mutation',
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    prodCompany: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

const RootQuerySchema = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query Schema',
  fields: () => ({
    // Get All Production Companies.
    companies: {
      type: new GraphQLList(CompanyType),
      async resolve () {
        try {
          const results = await Company.find({}).select('id name')
          return results
        }catch(err) {
          console.log(err.message)
        }
      }
    },
    // Get All Movies.
    movies: {
      type: new GraphQLList(movieType),
      async resolve () {
        try {
          const results = await Movie.find({}).select('id title prodCompany')
          return results
        }catch(err) {
          console.log(err.message)
        }
      }
    },
    // Search Movie Using Movie Title
    searchMovie: {
      type: new GraphQLList(movieType),
      args: {
        title: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve (parent, args) {
        try {
          const results = await Movie.find({title: args.title}).select('id title prodCompany')
          return results
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    // Search Movie Using Movie Production Company
    searchProdCompany: {
      type: new GraphQLList(CompanyType),
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      async resolve (parent, args) {
        try {
          const results = await Company.find({name: args.name}).select('id name')
          return results
        } catch (err) {
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
