const jwt = require('jsonwebtoken');
const AutoSchool = require('../models/autoSchoolModel')
const Cashier = require('../models/cashierModel')
const Teacher = require('../models/teacherModel')

async function auth(req, res, next) {
    try {
        const token = req?.headers?.authorization?.split(" ").pop() || null
        if (!token) {
            return res.status(401).json({ message: 'Token berilmagan' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: 'Token xato' })
        }
        const autoSchool = AutoSchool.findById(decoded.as_id)
        if (!autoSchool) {
            return res.status(401).json({ message: "Avtomaktab topilmadi" })
        }
        if (decoded.cashier_id) {
            const cashier = Cashier.findById(decoded.cashier_id)
            if (!cashier) {
                return res.status(401).json({ message: "Kassir topilmadi" })
            }
        }
        if (decoded.teacher_id) {
            const teacher = Teacher.findById(decoded.teacher_id)
            if (!teacher) {
                return res.status(401).json({ message: "O'qituvchi topilmadi" })
            }
        }
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e.message);
        return res.status(401).json({ message: "Server xatosi yoki avtorizatsiyadan o'tmadingiz" });
    }
}

module.exports = auth;