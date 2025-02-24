const Subject = require('../models/subjectModel');
const Group = require('../models/groupModel');
const AutoSchool = require('../models/autoSchoolModel');

exports.createSubject = async (req, res) => {
    try {
        const { as_id } = req.user
        const existSchool = await AutoSchool.findById(as_id);
        req.body.as_id = as_id;
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}
exports.updateSubject = async (req, res) => {
    try {
        const { id } = req.params
        const subject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(subject);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        const { id } = req.params
        const subject = await Subject.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: "Bosqich o'chirildi" });

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.getSubjects = async (req, res) => {
    try {
        const { as_id } = req.user

        const teachers = await Subject.find({ as_id })
        res.status(200).json(teachers);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}