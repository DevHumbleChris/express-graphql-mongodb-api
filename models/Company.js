const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Company', companySchema)
