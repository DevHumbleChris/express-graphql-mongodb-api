require('dotenv/config')
require('colors')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares.
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}))

// MongoDB Setup.
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// Database Connection.
const db = mongoose.connection
db.on('error', console.error.bind('console', `Failed To Connect To MongoDB`.bold.red))
db.once('open', () => {
  console.log(`Successfully Connected To MongoDB`.bold.blue)
})

// Routes error handling.
// 404 Error Handling.
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page Not Found'
  })
  next()
})
// 500 Error Handling.
app.use((err, req, res, next) => {
  res.status(404).json({
    message: 'Server Down',
    error: err.stack
  })
  next()
})

app.listen(PORT, () => {
  console.log(`Server Started At PORT: ${PORT}`.bold.cyan)
})
