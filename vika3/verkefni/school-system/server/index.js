const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { Student, Teacher, Course } = require('./data/db');
const { CastError, ValidationError } = require('mongoose').Error;
const { coursePeopleValidation } = require('./utils/dataUtils');

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: `Student with id: ${id} was not found` });
        res.json(student);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Student with id: ${id} was not found` });
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/students/:id/courses', async (req, res) => {
    const { id } = req.params;
    try {
        const courses = await Course.find({ students: id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: `Student with id: ${id} was not found` });
        res.json(student);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ message: `Student with id: ${id} was not found` });
        res.json(student);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Student with id: ${id} was not found` });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ message: `Teacher with id: ${id} was not found` });
        res.json(teacher);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Teacher with id: ${id} was not found` });
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/teachers/:id/courses', async (req, res) => {
    const { id } = req.params;
    try {
        const courses = await Course.find({ $or: [{ teachers: id }, { teachingAssistants: id }] });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/teachers', async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
        if (!teacher) return res.status(404).json({ message: `Teacher with id: ${id} was not found` });
        res.json(teacher);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.delete('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) return res.status(404).json({ message: `Teacher with id: ${id} was not found` });
        res.json(teacher);
    } catch (error) {
        if (error instanceof CastError)
            return res.status(404).json({ message: `Teacher with id: ${id} was not found` });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id).populate('students teachers teachingAssistants');
        if (!course) return res.status(404).json({ message: `Course with id: ${id} was not found` });
        res.json(course);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Course with id: ${id} was not found` });
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/courses', async (req, res) => {
    if (!(await coursePeopleValidation(req)))
        return res.status(400).json({ message: 'Some student, teacher or teaching assistant was not found' });
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.patch('/courses/:id', async (req, res) => {
    if (!(await coursePeopleValidation(req)))
        return res.status(400).json({ message: 'Some student, teacher or teaching assistant was not found' });
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) return res.status(404).json({ message: `Course with id: ${id} was not found` });
        res.json(course);
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) return res.status(404).json({ message: `Course with id: ${id} was not found` });
        res.json(course);
    } catch (error) {
        if (error instanceof CastError) return res.status(404).json({ message: `Course with id: ${id} was not found` });
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

app.use((req, res) => res.status(404).json({ message: `Resource for ${req.method} ${req.url} was not found` }));
app.listen(PORT, () => console.log(`Server has started and is listening on port ${PORT}`));
