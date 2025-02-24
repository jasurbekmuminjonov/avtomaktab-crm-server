const express = require('express');
const auth = require('../middlewares/auth');
const { createAutoSchool, loginAutoSchool } = require('../controllers/autoSchoolController');
const { updateCashier, deleteCashier, loginCashier, createCashier, getCashiers } = require('../controllers/cashierController');
const { createteacher, loginteacher, updateTeacher, deleteTeacher, getTeachers } = require('../controllers/teacherController');
const { getSubjects, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');
const { getGroups, deleteGroup, updateGroup, createGroup } = require('../controllers/groupController');
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { deletePayment, updatePayment, createPayment, getPayments } = require('../controllers/paymentController');

const rt = express.Router();

//autoSchool
rt.post("/aschool/create", createAutoSchool)
rt.post("/aschool/login", loginAutoSchool)

//cashier
rt.get("/cashier", auth, getCashiers)
rt.post("/cashier/create", auth, createCashier)
rt.post("/cashier/login", loginCashier)
rt.put("/cashier/:id", auth, updateCashier)
rt.delete("/cashier/:id", auth, deleteCashier)

//teacher
rt.get("/teacher", auth, getTeachers)
rt.post("/teacher/create", auth, createteacher)
rt.post("/teacher/login", loginteacher)
rt.put("/teacher/:id", auth, updateTeacher)
rt.delete("/teacher/:id", auth, deleteTeacher)

//subject
rt.get("/subject", auth, getSubjects)
rt.post("/subject/create", auth, createSubject)
rt.put("/subject/:id", auth, updateSubject)
rt.delete("/subject/:id", auth, deleteSubject)

//group
rt.get("/group", auth, getGroups)
rt.post("/group/create", auth, createGroup)
rt.put("/group/:id", auth, updateGroup)
rt.delete("/group/:id", auth, deleteGroup)

//student
rt.get("/student", auth, getStudents)
rt.post("/student/create", auth, createStudent)
rt.put("/student/:id", auth, updateStudent)
rt.delete("/student/:id", auth, deleteStudent)

//payment
rt.get("/payment", auth, getPayments)
rt.post("/payment/create", auth, createPayment)
rt.put("/payment/:id", auth, updatePayment)
rt.delete("/payment/:id", auth, deletePayment)


module.exports = rt;