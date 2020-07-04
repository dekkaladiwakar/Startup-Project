import express from "express";
import passport from "passport";
import { Pool } from "mysql";

// Database connection
const conn: Pool = require("../../../config/connection");

const router = express.Router();

// @route   GET api/u/dashboard
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

// @route   GET api/u/dashboard/profile
// @desc    Get current user profile
// @access  Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: any = {};

    conn.query(
      "SELECT institute_id FROM institutes WHERE institute_id = ?",
      //@ts-expect-error
      req.user.institute_id,
      (err, rows) => {
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
