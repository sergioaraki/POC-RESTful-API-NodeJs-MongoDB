'use strict'

module.exports = function (app) {
  const career = require('../controllers/CareerController');

  app.route('/careers')
    .get(career.list_all_careers)
    .post(career.new_career);

  app.route('/careers/:careerId')
    .get(career.get_career)
    .put(career.update_career)
    .delete(career.delete_career);

  app.route('/careersCourse/:careerId/:courseId')
    .put(career.add_course)
    .delete(career.remove_course);
}