'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  course_id: {
    type: Schema.Types.ObjectId,
    required: 'course_id is required'
  },
  status: {
    type: [{
      type: String,
      enum: ['registered', 'completed']
    }],
    default: ['registered']
  },
  grade: {
    type: Number,
    default: 0
  }
},{_id: false});

const StudentSchema = new Schema({
  name: {
    type: String,
    required: 'name is required'
  },
  birthdate: {
    type: Date,
    required: 'birthdate is required'
  },
  address: {
    type: String,
    required: 'address is required'
  },
  career_id: {
    type: Schema.Types.ObjectId,
    required: 'career_id is required'
  },
  courses: [CourseSchema]
});

module.exports = mongoose.model('Students', StudentSchema);