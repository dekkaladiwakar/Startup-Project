const express = require("express");
const passport = require("passport");

const router = express.Router();

// DB Connection
const conn = require("../../../../config/connection");

// Custom routes
const addStudent = require("./add_student");

// Validation
const validateStudentInput = require("../../../../validation/private-route-validation/validate_student");

// @route   GET /api/u/students
// @desc    Students's page
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
      "SELECT * FROM students WHERE institute_id = ?",
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error : " + err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/students/add
// @desc    Add studetns
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateStudentInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const student = {
        institute_id: req.user.institute_id,
        full_name: req.body.full_name,
        gender: req.body.gender,
        dob: req.body.dob,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
      };

      // Need to be converted into JSON String for DB to consider it as JSON object
      const studentJSON = JSON.stringify(student);

      addStudent(studentJSON)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
    }
  }
);

module.exports = router;
