import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Custom routes
const addStudent = require("./add_student");
const deleteStudent = require("./delete_student");

// Validation
const validateStudentInput = require("../../../../validation/private-route-validation/student");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET /api/u/students
// @desc    Students page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Students's Page");
  }
);

// @route   GET /api/u/students/all
// @desc    get all available students
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT students.name FROM students INNER JOIN student_institutes ON student_institutes.student_id = students.student_id WHERE student_institutes.institute_id = ?;",
      // @ts-expect-error
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error : " + err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/classes/students/add
// @desc    Add studetns, parent details
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateStudentInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const student_parent = {
        // @ts-expect-error
        institute_id: req.user.institute_id,
        class_id: req.body.class_id,
        surname: req.body.surname,
        name: req.body.name,
        surname_begining: req.body.surname_begining,
        gender: req.body.gender,
        roll_number: req.body.roll_number,
        dob: req.body.dob,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
        father: req.body.father,
        occupation_father: req.body.occupation_father,
        mother: req.body.mother,
        occupation_mother: req.body.occupation_mother,
        address: req.body.address,
        p_email: req.body.p_email,
        primary_number: req.body.primary_number,
        secondary_number: req.body.secondary_number,
      };

      // Need to be converted into JSON String for DB to consider it as JSON object
      const studentJSON = JSON.stringify(student_parent);

      addStudent(studentJSON)
        .then((data: {}) => res.status(200).json(data))
        .catch((err: {}) => res.status(400).json(err));
    }
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      //@ts-expect-error
      institute_id: req.user.institute_id,
      student_id: req.body.student_id,
    };

    const studentJSON = JSON.stringify(student);

    deleteStudent(studentJSON)
      .then((data: {}) => res.status(200).json(data))
      .catch((err: {}) => res.status(400).json(err));
  }
);

module.exports = router;
