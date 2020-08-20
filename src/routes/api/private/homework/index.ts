import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// @route   GET /api/u/homework/
// @desc    Homework Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Homework Page");
  }
);

// @route   GET /api/u/homework/:id
// @desc    retrieve homework of a student
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Homework of a student");
  }
);
// @route   POST /api/u/homework/add
// @desc    Add homework
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const homework = {
      timetable_id: req.body.timetable_id,
      date_created: req.body.date_created,
      homework_content: req.body.homework_content,
    };

    conn.query(
      "INSERT INTO homework (timetable_id, date_created, homework_content) VALUES (?, ?, ?);",
      [homework.timetable_id, homework.date_created, homework.homework_content],
      (err, rows) => {
        if (err) {
          console.log("Query Error : ", err);
          res.status(400).json(err);
        }
        res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/homework/add
// @desc    Add homework
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
