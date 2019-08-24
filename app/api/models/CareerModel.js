'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CareerSchema = new Schema({
  name: {
    type: String,
    required: 'name is required'
  },
  degree: {
    type: String,
    required: 'degree is required'
  },
  courses: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Careers', CareerSchema);