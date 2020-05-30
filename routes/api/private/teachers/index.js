const express = require("express");
const passport = require("passport");

const router = express.Router();

// DB Connection
const conn = require("../../../../config/connection");

// Custom routes
const addTeacher = require("./add_teacher");

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
    conn.query("SELECT * FROM teachers", (err, rows) => {
      if (err) console.log("Query Error : " + err);
      else res.status(200).json(rows);
    });
  }
);

// @route   POST /api/u/teachers/add
// @desc    add teachers
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    addTeacher(req.body)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
