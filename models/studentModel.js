const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: null,
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

module.exports = mongoose.model('Student', StudentSchema);