const express = require("express");
const passport = require("passport");

const router = express.Router();

// DB Connection
const conn = require("../../../../config/connection");

// Custom routes
const addTeacher = require("./add_teacher");

// Validation
const validateTeacherInput = require("../../../../validation/private-route-validation/validate_teacher");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET /api/u/teachers
// @desc    Teacher's page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Teacher's Page");
  }
);

// @route   GET /api/u/teachers/all
// @desc    get all available teachers
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT teachers.full_name FROM teachers INNER JOIN teacher_institutes ON teacher_institutes.teacher_id = teachers.teacher_id WHERE teacher_institutes.institute_id = ?;",
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error : " + err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/teachers/add
// @desc    add teachers
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateTeacherInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const teacher = {
        institute_id: req.user.institute_id,
        full_name: req.body.full_name,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
      };

      // Need to be converted into JSON String for DB to consider it as JSON object
      const teacherJSON = JSON.stringify(teacher);

      addTeacher(teacherJSON)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
    }
  }
);

module.exports = router;
