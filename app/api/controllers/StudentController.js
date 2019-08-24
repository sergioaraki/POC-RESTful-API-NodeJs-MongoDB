'use strict'

const mongoose = require('mongoose');

const Student = mongoose.model('Students');
const Career = mongoose.model('Careers');

exports.list_all_students = function (req, res) {
  Student.find({}, function (err, students) {
    if (err) { res.send(err); }
    res.json(students);
  });
}

exports.new_student = function (req, res) {
  const newStudent = new Student(req.body);
  newStudent.save(function (err, student) {
    if (err) { res.send(err); }
    res.json(student);
  });
}

exports.get_student = function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) { res.send(err); }
    res.json(student);
  });
}

exports.update_student = function (req, res) {
  Student.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, function (err, student) {
    if (err) { res.send(err); }
    res.json(student);
  });
}

exports.add_course = function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) { res.send(err); }
    Career.findById(student.career_id, function (err, career) {
      if (err) { res.send(err); }
      var index = career.courses.indexOf(req.params.courseId);
      if (index!=-1) {
        var newCourse = new Object();
        newCourse.course_id = req.params.courseId;
        student.courses.addToSet(newCourse);
        student.save();
        res.json(student);    
      }
      else { res.json({ message: 'Course is not valid' }); } 
    }); 
  });
}

exports.remove_course = function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) { res.send(err); }
    student.courses.pull(req.params.courseId); 
    student.save();
    res.json({ message: 'course successfully removed' });
  });
}

exports.update_course = function (req, res) {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) { res.send(err); }
    for (var i=0; i < student.courses.length; i++)
        if (student.courses[i].course_id === req.params.courseId)
            break;
    if (i <= student.courses.length) {
      if (req.params.status === 'completed') {
        if (req.params.grade>=0 && req.params.grade<=10){
          student.courses[i-1].status = req.params.status;
          student.courses[i-1].grade = req.params.grade;
          student.save();
          res.json(student);
        }
        else  { res.json({ message: 'grade is not a valid value' }); }
      }
      else { res.json({ message: 'status is not completed' }); }
    }
    else { res.json({ message: 'course is not valid' }); }
  });
}

exports.delete_student = function (req, res) {
  Student.deleteOne({
    _id: req.params.studentId
  }, function (err, student) {
    if (err) { res.send(err); }
    res.json({ message: 'student successfully deleted' });
  });
}