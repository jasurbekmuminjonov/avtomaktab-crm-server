const Spending = require('../models/spendingModel');

exports.createSpending = async (req, res) => {
    try {
        const { as_id } = req.user
        req.body.as_id = as_id;
        const spending = new Spending(req.body);
        await spending.save();
        res.status(201).json(spending);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getAllSpending = async (req, res) => {
    try {
        const { as_id } = req.user
        const spendings = await Spending.find({ as_id });
        res.status(200).json(spendings);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}