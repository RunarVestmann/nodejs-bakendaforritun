const { Teacher, Student } = require('../data/db');

const coursePeopleValidation = async (req) => {
    const promises = [];
    if (req.body.teachers) req.body.teachers.forEach((t) => promises.push(idExists(Teacher, t)));
    if (req.body.teachingAssistants) req.body.teachingAssistants.forEach((t) => promises.push(idExists(Teacher, t)));
    if (req.body.students) req.body.students.forEach((s) => promises.push(idExists(Student, s)));
    const responses = await Promise.all(promises);
    return responses.every((r) => r);
};

const idExists = async (Model, id) => {
    try {
        const document = await Model.findById(id);
        if (!document) return false;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { idExists, coursePeopleValidation };
