const Payment = require('../models/paymentModel');
const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
const Subject = require('../models/subjectModel');

exports.createPayment = async (req, res) => {
    try {
        const { as_id, role } = req.user
        if (role === "teacher") {
            return res.status(403).json({ message: "To'lovni faqat admin va kassir amalga oshira oladi" });
        }
        req.body.as_id = as_id;
        const student = await Student.findById(req.body.student_id);
        const group = await Group.findById(student?.group_id);
        const subject = await Subject.findById(group?.subject_id);
        const payment = new Payment(req.body);
        await payment.save();
        const paymentData = {
            student_id: payment.student_id,
            student_name: student.name,
            group_id: payment.group_id,
            group_name: group?.group_number + group?.group_name,
            subject_id: subject?.id,
            subject_name: subject?.name,
            amount: payment.amount,
            payment_method: payment.payment_method,
            created_at: payment.createdAt,
        }
        res.status(200).json(paymentData);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}
exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user

        if (role !== "admin") {
            return res.status(403).json({ message: "To'lovni faqat admin tahrirlay oladi" });
        }
        await Payment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "To'lov tahrirlandi" });


    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "To'lovni faqat admin o'chira oladi" });
        }
        const payment = await Payment.findByIdAndDelete(id);
        res.status(200).json({ message: "To'lov o'chirildi" });

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getPayments = async (req, res) => {
    try {
        const { ac_id } = req.user

        const payments = await Payment.find({ ac_id })
        res.status(200).json(payments);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}