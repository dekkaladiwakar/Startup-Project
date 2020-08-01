import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Custom Routes
const addAttendance = require("./addAttendance");

// @route   GET /api/u/attendance
// @desc    Attendance Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Attendance Page");
  }
);

// @route   GET /api/u/attendance/all
// @desc    Send section attendance
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //@ts-expect-error
    const institute_id = req.user.institute_id;
    const class_id = req.body.class_id;

    conn.query(
      "SELECT attendance_data FROM attendance_day INNER JOIN institute_classes ON attendance_day.class_id = ? WHERE institute_id = ?",
      [class_id, institute_id],
      (err, rows) => {
        if (err) console.log("Query Error : ", err);
        else {
          const rowsJSON = JSON.parse(rows[0].attendance_data);
          const student_ids = rowsJSON.studentIDs;
          res.status(200).json(rowsJSON);
        }
      }
    );
  }
);

// @route   POST /api/u/attendence/add
// @desc    Add attendance
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    addAttendance(req.body)
      .then((result: {}) => {
        res.status(200).json(result);
      })
      .catch((err: {}) => res.status(400).json(err));
  }
);

module.exports = router;
