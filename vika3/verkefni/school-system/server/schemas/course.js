const { Schema } = require('mongoose');

module.exports = new Schema({
    name: { type: String, required: true },
    teachers: [{ type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }],
    teachingAssistants: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    description: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});
