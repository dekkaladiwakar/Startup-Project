import express from "express";
import passport from "passport";

// Custom Routes
const addTimeTalbe = require("./add_timetable");
const addTimeSlot = require("./add_timeslot");

const router = express.Router();

// @route   GET /api/u/timetable
// @desc    Timetable Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Timetable Page");
  }
);

// @route   POST /api/u/timetable/addTimeSlots
// @desc    Add timeslots
// @access  Private
router.post(
  "/addTimeSlots",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const timeslot = {
      // @ts-expect-error
      institute_id: req.user.institute_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      description: req.body.description,
    };

    const timeslotJSON = JSON.stringify(timeslot);
    addTimeSlot(timeslotJSON)
      .then((data: {}) => res.status(200).json(data))
      .catch((err: {}) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

// @route   POST /api/u/timetable/addTimetable
// @desc    Add timetable
// @access  Private
router.post(
  "/addTimetable",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const timetable = {
      // @ts-expect-error
      institute_id: req.user.institute_id,
      timeslot_id: req.body.timeslot_id,
      day_id: req.body.day_id,
      class_id: req.body.class_id,
      teacher_id: req.body.teacher_id,
      subject_id: req.body.subject_id,
    };

    const timetableJSON = JSON.stringify(timetable);
    addTimeTalbe(timetableJSON)
      .then((data: {}) => res.status(200).json(data))
      .catch((err: {}) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

module.exports = router;
