'use strict'

const mongoose = require('mongoose');

const Course = mongoose.model('Courses');

exports.list_all_courses = function (req, res) {
  Course.find({}, function (err, courses) {
    if (err) { res.send(err); }
    res.json(courses);
  });
}

exports.new_course = function (req, res) {
  const newCourse = new Course(req.body);
  newCourse.save(function (err, course) {
    if (err) { res.send(err); }
    res.json(course);
  });
}

exports.get_course = function (req, res) {
  Course.findById(req.params.courseId, function (err, course) {
    if (err) { res.send(err); }
    res.json(course);
  });
}

exports.update_course = function (req, res) {
  Course.findOneAndUpdate({ _id: req.params.courseId }, req.body, { new: true }, function (err, course) {
    if (err) { res.send(err); }
    res.json(course);
  });
}

exports.delete_course = function (req, res) {
  Course.deleteOne({
    _id: req.params.courseId
  }, function (err, course) {
    if (err) { res.send(err); }
    res.json({ message: 'Course successfully deleted' });
  });
}