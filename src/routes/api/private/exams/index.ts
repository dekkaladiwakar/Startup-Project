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
    const exam = {};

    const examJSON = JSON.stringify(exam);

    addExam(examJSON)
      .then((result: {}) => res.status(200).json(result))
      .catch((err: {}) => res.status(400).json(err));
  }
);

module.exports = router;
