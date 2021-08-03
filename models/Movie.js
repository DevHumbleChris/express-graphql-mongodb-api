const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  prodCompany: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Movie', movieSchema)
