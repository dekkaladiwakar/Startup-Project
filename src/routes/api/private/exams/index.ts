import express from "express";
import passport from "passport";
import { Pool } from "mysql";
import { EDESTADDRREQ } from "constants";

const router = express.Router();

// Database Connection
const conn: Pool = require("../../../../config/connection");

// Custom Routes
const addExamDates = require("./add_exam_dates");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Exam Page");
  }
);

router.post(
  "/addDates",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const examDates = {
      //@ts-expect-error
      institute_id: req.user.institute_id,
      classes: JSON.parse(req.body.classID),
      subjects: JSON.parse(req.body.subject_id),
      type_id: req.body.type_id,
      exam_date: req.body.exam_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      date_added: req.body.date_added,
      time_added: req.body.time_added,
    };

    const examJSON = JSON.stringify(examDates);

    addExamDates(examJSON)
      .then((result: {}) => res.status(200).json(result))
      .catch((err: {}) => res.status(400).json(err));
  }
);

module.exports = router;
