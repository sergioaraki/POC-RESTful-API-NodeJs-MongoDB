'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: 'name is required'
  },
  workload: {
      type: Number,
      required: 'workload is required'
  }
});

module.exports = mongoose.model('Courses', CourseSchema);