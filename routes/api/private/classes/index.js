const express = require("express");
const passport = require("passport");

const router = express.Router();

// DB Connection
const conn = require("../../../../config/connection");

// Custom routes
const addClass = require("./add_class");

// Validation
const validateClassInput = require("../../../../validation/private-route-validation/validate_class");

// @route   GET /api/u/class
// @desc    Class page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Class -> Main Page");
  }
);

// @route   GET /api/u/class/all
// @desc    get all available classes
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT class_name, section_name FROM classes WHERE institute_id = ?",
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error : " + err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/class/add
// @desc    Add class
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateClassInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const class_details = {
        institute_id: req.user.institute_id,
        teacher_id: req.body.teacher_id,
        class_name: req.body.class_name,
        section_name: req.body.section_name,
      };

      // Need to be converted into JSON String for DB to consider it as JSON object
      const classJSON = JSON.stringify(class_details);

      addClass(classJSON)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
    }
  }
);

module.exports = router;
