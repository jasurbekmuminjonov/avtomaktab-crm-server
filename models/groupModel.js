const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    group_name: String,
    group_number: String,
    teacher_id: {
        type: String,
        default: ""
    },
    as_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AutoSchool',
        required: true,
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Student',
        default: []
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true,
    }
});

module.exports = mongoose.model('Group', GroupSchema);