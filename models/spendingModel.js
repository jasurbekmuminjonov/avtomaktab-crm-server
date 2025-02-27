const mongoose = require('mongoose');

const SpendingSchema = new mongoose.Schema({
    description: String,
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    as_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Spending', SpendingSchema);