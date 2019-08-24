'use strict'

module.exports = function (app) {
  const student = require('../controllers/StudentController');

  app.route('/students')
    .get(student.list_all_students)
    .post(student.new_student);

  app.route('/students/:studentId')
    .get(student.get_student)
    .put(student.update_student)
    .delete(student.delete_student);

  app.route('/studentsCourse/:studentId/:courseId')
  	.put(student.add_course)
    .delete(student.remove_course);

  app.route('/studentsUpdateCourse/:studentId/:courseId/:status/:grade')
  	.put(student.update_course);
}