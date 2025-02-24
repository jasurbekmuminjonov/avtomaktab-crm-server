const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
exports.createStudent = async (req, res) => {
    try {
        const { as_id } = req.user
        req.body.as_id = as_id;
        const existStudent = await Student.findOne({ phone: req.body.phone });
        if (existStudent) {
            return res.status(409).json({ message: "Bu telefon raqam bilan o'quvchi mavjud" });
        }
        const student = new Student(req.body);
        await student.save();
        await Group.findByIdAndUpdate(req.body.group_id, { $push: { students: student._id } }, { new: true });
        res.status(201).json(student);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "O'quvchi topilmadi" });
        }
        const oldGroupId = student.group_id;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (req.body.group_id && oldGroupId !== req.body.group_id) {
            await Group.findByIdAndUpdate(oldGroupId, { $pull: { students: id } });
            await Group.findByIdAndUpdate(req.body.group_id, { $push: { students: id } });
        }
        res.status(200).json({ message: "O'quvchi tahrirlandi", student: updatedStudent });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Serverda xatolik" });
    }
};
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        if (!student) {
            return res.status(404).json({ message: "O'quvchi topilmadi" });
        }
        if (student.group_id) {
            await Group.findByIdAndUpdate(student.group_id, { $pull: { students: id } });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Serverda xatolik" });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const { as_id } = req.user

        const students = await Student.find({ as_id })
        res.status(200).json(students);

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}