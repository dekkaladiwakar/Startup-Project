const express = require("express");
const router = express.Router();
const passport = require("passport");

const conn = require("../../../config/connection");
const addStudent = require("./add_users/student");

// Validation File
const validateStudentInput = require("../../../validation/private-route-validation/validate_student");
// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   POST api/private/dashboard
// @desc    Return current user (Test Route)
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // req.user -> user is a default return parameter name for passport module.
    res.json(req.user);
  }
);

// @route   GET api/private/dashboard/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    conn.query(
      "SELECT institute_id FROM institutes WHERE institute_id = ?",
      req.user.institute_id,
      (err, rows, fields) => {
        if (err) {
          console.log("DB Connection Error : " + err);
          res.status(400).json(err);
        } else if (Object.keys(rows).length != 0) {
          res.status(200).json(req.user);
        } else {
          errors.noprofile = "There is no profile for this user.";
          res.status(400).json(errors);
        }
      }
    );
  }
);

// @route   POST api/private/dashboard/add_student
// @desc    Add student details
// @access  Private
router.post(
  "/add_student",
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
