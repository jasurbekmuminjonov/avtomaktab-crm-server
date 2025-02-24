const Cashier = require('../models/cashierModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AutoSchool = require('../models/autoSchoolModel');

exports.createCashier = async (req, res) => {
    try {
        const { as_id, role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "Kassirni faqat admin yarata oladi" });
        }
        const existCashier = await Cashier.findOne({ phone: req.body.phone });
        if (existCashier) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan kassir mavjud" });
        }
        const hashed = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashed;
        req.body.as_id = as_id;
        const cashier = new Cashier(req.body);
        await cashier.save();
        res.status(201).json({ message: "Kassir muvaffaqiyatli yaratildi" });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.loginCashier = async (req, res) => {
    try {
        const { phone, password } = req.body

        const existCashier = await Cashier.findOne({ phone: phone });
        const autoSchool = await AutoSchool.findById(existCashier.as_id)
        if (!existCashier) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan kassir mavjud emas" });
        }
        const isMatch = await bcrypt.compare(password, existCashier.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Parol noto'gri" });
        }
        const token = jwt.sign({ cashier_id: existCashier._id, as_id: existCashier.as_id, role: "cashier" }, process.env.JWT_SECRET)
        res.status(200).json({ token, user: { name: autoSchool.name, role: "cashier", cashier_id: existCashier._id } });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.updateCashier = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "Kassir ma'lumotlarini faqat admin tahrirlay oladi" });
        }
        const hashed = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashed;
        const existPhone = await Cashier.findOne({ phone: req.body.phone })
        if (existPhone && existPhone._id.toString() !== id) {
            return res.status(400).json({ message: "Bunday telefon raqam bilan kassir mavjud" });
        }
        const cashier = await Cashier.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(cashier);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}
exports.deleteCashier = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.user
        if (role !== "admin") {
            return res.status(403).json({ message: "Kassir ma'lumotlarini faqat admin o'chira oladi" });
        }
        await Cashier.findByIdAndDelete(id);
        res.status(204).json();
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getCashiers = async (req, res) => {
    try {
        const { as_id } = req.user
        const cashiers = await Cashier.find({ as_id })
        res.status(200).json(cashiers);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}