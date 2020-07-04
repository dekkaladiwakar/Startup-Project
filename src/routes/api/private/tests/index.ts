import express, { Router } from "express";
import passport from "passport";

const router: Router = express.Router();

// Custom Routes
const addTest = require("./add_tests");
const addResult = require("./add_results");

// Validation
const validateAddTestInput = require("../../../../validation/private-route-validation/addTest");
const validateTestResultInput = require("../../../../validation/private-route-validation/addTestResults");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Test Page. * Display available tests *");
  }
);

router.post(
  "/addTestResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTestResultInput;

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const results = {
        institute_id: req.body.institute_id,
        class_id: req.body.class_id,
        teacher_id: req.body.teacher_id,
        syllabus_id: req.body.syllabus_id,
        test_results: req.body.test_results,
        out_of: req.body.out_of,
        date_added: curr_date,
        time_added: curr_time,
      };

      const resultsJSON = JSON.stringify(results);

      addResult(resultsJSON)
        .then((data: {}) => res.status(200).json(data))
        .catch((err: Error) => res.status(400).json(err));
    }
  }
);

router.post(
  "/addTestSyllabus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddTestInput;

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const syllabus = {
        institute_id: req.body.institute_id,
        class_id: req.body.class_id,
        teacher_id: req.body.teacher_id,
        subject_id: req.body.subject_id,
        syllabus_content: req.body.syllabus_content,
        test_date: req.body.test_date,
        date_added: curr_date,
        time_added: curr_time,
      };

      const syllabusJSON = JSON.stringify(syllabus);

      addTest(syllabusJSON)
        .then((data: {}) => res.status(200).json(data))
        .catch((err: {}) => res.status(400).json(err));
    }
  }
);
module.exports = router;
