'use strict'

const mongoose = require('mongoose');

const Career = mongoose.model('Careers');

exports.list_all_careers = function (req, res) {
  Career.find({}, function (err, careers) {
    if (err) { res.send(err); }
    res.json(careers);
  });
}

exports.new_career = function (req, res) {
  const newCareer = new Career(req.body);
  newCareer.save(function (err, career) {
    if (err) { res.send(err); }
    res.json(career);
  });
}

exports.get_career = function (req, res) {
  Career.findById(req.params.careerId, function (err, career) {
    if (err) { res.send(err); }
    res.json(career);
  });
}

exports.update_career = function (req, res) {
  Career.findOneAndUpdate({ _id: req.params.careerId }, req.body, { new: true }, function (err, career) {
    if (err) { res.send(err); }
    res.json(career);
  });
}

exports.add_course = function (req, res) {
  Career.findById(req.params.careerId, function (err, career) {
    if (err) { res.send(err); }
    career.courses.addToSet(req.params.courseId); 
    career.save();
    res.json(career);
  });
}

exports.remove_course = function (req, res) {
  Career.findById(req.params.careerId, function (err, career) {
    if (err) { res.send(err); }
    career.courses.pull(req.params.courseId); 
    career.save();
    res.json(career);
  });
}

exports.delete_career = function (req, res) {
  Career.deleteOne({
    _id: req.params.careerId
  }, function (err, career) {
    if (err) { res.send(err); }
    res.json({ message: 'career successfully deleted' });
  });
}