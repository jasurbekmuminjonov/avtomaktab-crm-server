const AutoSchool = require('../models/autoSchoolModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAutoSchool = async (req, res) => {
    try {
        const existSchool = await AutoSchool.findOne({ phone: req.body.phone });
        if (existSchool) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan avtomaktab mavjud" });
        }
        const hashed = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashed;
        const school = new AutoSchool(req.body);
        await school.save();
        res.status(201).json({ message: "Avtomaktab muvaffaqiyatli yaratildi" });

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.loginAutoSchool = async (req, res) => {
    try {
        const { phone, password } = req.body
        const existSchool = await AutoSchool.findOne({ phone: phone });
        if (!existSchool) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan avtomaktab mavjud emas" });
        }
        const isMatch = await bcrypt.compare(password, existSchool.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Parol noto'gri" });
        }
        const token = jwt.sign({ as_id: existSchool._id, role: "admin" }, process.env.JWT_SECRET)
        res.status(200).json({ token, user: { name: existSchool.name, role: "admin", as_id: existSchool._id } });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}