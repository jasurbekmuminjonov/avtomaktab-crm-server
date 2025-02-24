const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: String,
    phone: {
        type: String,
        required: true,
        match: [/^\d{9}$/, 'Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak']
    },
    password: {
        type: String,
        required: true,
    },
    as_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AutoSchool',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);