const mongoose = require('mongoose');
const studentSchema = require('../schemas/student');
const teacherSchema = require('../schemas/teacher');
const courseSchema = require('../schemas/course');

const password = process.env.DB_PASSWORD;

const connection = mongoose.createConnection(
    `mongodb+srv://admin:${password}@school-system.ni8hp.mongodb.net/school-system?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

module.exports = {
    Student: connection.model('Student', studentSchema),
    Teacher: connection.model('Teacher', teacherSchema),
    Course: connection.model('Course', courseSchema),
};
