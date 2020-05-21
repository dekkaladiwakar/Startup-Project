const express = require("express");
const router = express.Router();
const passport = require("passport");

const conn = require("../../../config/connection");

// @route   POST api/private
// @desc    Return current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // req.user -> user is a default return parameter name for passport module.
    res.json(req.user);
  }
);

// @route   GET api/private/profile
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

module.exports = router;
