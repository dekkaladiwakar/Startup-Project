import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Validation
const validateHoliday = require("../../../../validation/private-route-validation/validate_holiday");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET /api/u/occasions/holidays
// @desc    Holiday Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Holiday Page");
  }
);

// @route   GET /api/u/occasions/holidays/all
// @desc    Display all holidays
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT institute_name, date_of_holiday_from, date_of_holiday_to, reason, date_of_creation, time_of_creation FROM holidays WHERE institute_id = ?",
      // @ts-expect-error
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error: " + err);
        res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/occasions/holidays/add
// @desc    Add holiday
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateHoliday(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const holiday = {
        // @ts-expect-error
        institute_id: req.user.institute_id,
        date_of_holiday_from: req.body.date_of_holiday_from,
        date_of_holiday_to: req.body.date_of_holiday_to,
        reason: req.body.reason,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
      };

      conn.query(
        "INSERT INTO holidays (institute_id, date_of_holiday_from, date_of_holiday_to, reason, date_of_creation, time_of_creation) VALUES (?, ?, ?, ?, ?, ?);",
        [
          holiday.institute_id,
          holiday.date_of_holiday_from,
          holiday.date_of_holiday_to,
          holiday.reason,
          holiday.date_of_creation,
          holiday.time_of_creation,
        ],
        (err, rows) => {
          if (err) {
            console.log("Query Error : ", err);
            res.status(400).json({ success: false });
          } else
            res.status(200).json({ success: true, message: "Holiday posted." });
        }
      );
    }
  }
);

module.exports = router;
