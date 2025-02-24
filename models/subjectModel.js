const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: String,
    duration_months: Number,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    as_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AutoSchool',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);