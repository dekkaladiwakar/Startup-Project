import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// Database Connection
const conn: Pool = require("../../../../config/connection");

// Custom Routes
const addExam = require("./add_exam");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Exam Page");
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const exam = {
      //@ts-expect-error
      institute_id: req.user.institute_id,
      class_id: JSON.parse(req.body.classID),
      subject_id: req.body.subject_id,
      exam_date: req.body.exam_date,
      syllabus: req.body.syllabus,
      date_added: req.body.date_added,
      time_added: req.body.time_added,
    };

    const examJSON = JSON.stringify(exam);

    addExam(examJSON)
      .then((result: {}) => res.status(200).json(result))
      .catch((err: {}) => res.status(400).json(err));
  }
);

module.exports = router;
