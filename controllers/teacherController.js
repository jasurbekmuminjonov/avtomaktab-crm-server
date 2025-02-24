const Teacher = require('../models/teacherModel');
const AutoSchool = require('../models/autoSchoolModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createteacher = async (req, res) => {
    try {
        const { as_id, role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "O'qituvchini faqat admin yarata oladi" });
        }
        const existTeacher = await Teacher.findOne({ phone: req.body.phone });
        if (existTeacher) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan o'qituvchi mavjud" });
        }
        const hashed = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashed;
        req.body.as_id = as_id;
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json({ message: "O'qituvchi muvaffaqiyatli yaratildi" });

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.loginteacher = async (req, res) => {
    try {
        const { phone, password } = req.body
        const existTeacher = await Teacher.findOne({ phone: phone });
        const autoSchool = await AutoSchool.findById(existTeacher.as_id)
        if (!existTeacher) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan o'qituvchi mavjud emas" });
        }
        const isMatch = await bcrypt.compare(password, existTeacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Parol noto'gri" });
        }
        const token = jwt.sign({ teacher_id: existTeacher._id, as_id: existTeacher.as_id, role: "teacher" }, process.env.JWT_SECRET)
        res.status(200).json({ token, user: { name: autoSchool.name, role: "teacher", teacher_id: existTeacher._id } });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "O'qituvchi ma'lumotlarini faqat admin tahrirlay oladi" });
        }
        if (req.body.password) {
            const hashed = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashed;
        }
        if (req.body.phone) {
            const existPhone = await Teacher.findOne({ phone: req.body.phone })
            if (existPhone && existPhone._id.toString() !== id) {
                return res.status(400).json({ message: "Bunday telefon raqam bilan kassir mavjud" });
            }
        }
        const teacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(teacher);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "O'qituvchi ma'lumotlarini faqat admin o'chira oladi" });
        }
        await Teacher.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(204).json();
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const { as_id } = req.user

        const teachers = await Teacher.find({ as_id })
        res.status(200).json(teachers);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}