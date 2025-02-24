const Group = require("../models/groupModel")
const Student = require("../models/studentModel")

exports.createGroup = async (req, res) => {
    try {
        const { as_id } = req.user
        req.body.as_id = as_id;
        const group = new Group(req.body);
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.updateGroup = async (req, res) => {
    try {
        const { id } = req.params
        const group = await Group.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(group);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "Serverda xatolik" });
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByIdAndUpdate(id, { status: "inactive" });
        if (!group) {
            return res.status(404).json({ message: "Guruh topilmadi" });
        }
        await Student.updateMany({ _id: { $in: group.students } }, { status: "inactive" });

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Serverda xatolik" });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const { as_id, teacher_id } = req.user;

        let filter = { as_id };
        if (teacher_id) {
            filter.teacher_id = teacher_id;
        }
        const groups = await Group.find(filter);
        res.status(200).json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Serverda xatolik" });
    }
};
