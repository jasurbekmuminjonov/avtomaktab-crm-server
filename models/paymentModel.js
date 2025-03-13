const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
        default: 'cash',
        enum: ['cash', 'card', 'transfer']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);