const express = require("express");
const passport = require("passport");

// Database connection
const conn = require("../../../../config/connection");

const router = express.Router();

// @route   GET /api/u/classes
// @desc    Class route
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Class -> Main page");
  }
);

// @route   GET /api/u/classes/all
// @desc    Class route
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query("SELECT * from classes", (err, rows, fields) => {
      if (err) console.log("Query Error : " + err);
      else res.status(200).json(rows);
    });
  }
);

// @route  POST /api/u/section/add_class
// @desc   add class
// @route  private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Insert Class details code procedure
  }
);

module.exports = router;
