'use strict'

module.exports = function (app) {
  const course = require('../controllers/CourseController');

  app.route('/courses')
    .get(course.list_all_courses)
    .post(course.new_course);

  app.route('/courses/:courseId')
    .get(course.get_course)
    .put(course.update_course)
    .delete(course.delete_course);
}