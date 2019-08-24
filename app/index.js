const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const Career = require('./api/models/CareerModel');
const Course = require('./api/models/CourseModel');
const Student = require('./api/models/StudentModel');

const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UniversityDB', {useNewUrlParser: true,useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const CareerRoutes = require('./api/routes/CareerRoutes');
const CourseRoutes = require('./api/routes/CourseRoutes');
const StudentRoutes = require('./api/routes/StudentRoutes');
CareerRoutes(app);
CourseRoutes(app);
StudentRoutes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

console.log('Node.js + MongoDB RESTful API server started on: ' + port);