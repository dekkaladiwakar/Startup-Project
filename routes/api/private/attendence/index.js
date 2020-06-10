const express = require("express");
const passport = require("passport");

const router = express.Router();

// DB Connection
const conn = require("../../../../config/connection");

// @route   GET /api/u/attendence
// @desc    Attendence Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Announcement Page");
  }
);

// @route   GET /api/u/attendence/all
// @desc    Attendence Page
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query("SELECT * FROM attendence", (err, rows) => {
      if (err) console.log("Query Error : ", err);
      else res.status(200).json(rows);
    });
  }
);

module.exports = router;
