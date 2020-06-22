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
    const institute_id = req.user.institute_id;
    const class_id = req.body.class_id;

    conn.query(
      "SELECT * FROM attendence WHERE institute_id = ? AND class_id = ?",
      (institute_id, class_id),
      (err, rows) => {
        if (err) console.log("Query Error : ", err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/attendence/add
// @desc    Attendence Page
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
