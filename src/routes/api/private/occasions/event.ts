import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Validation
const validateEvent = require("../../../../validation/private-route-validation/validate_event");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET /api/u/occasions/events
// @desc    Event Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Event Page");
  }
);

// @route   GET /api/u/occasions/events/all
// @desc    Display all events
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT institute_name, date_of_event, date_of_event_from, date_of_event_to, reason, date_of_creation, time_of_creation FROM events WHERE institute_id = ?",
      // @ts-expect-error
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error: " + err);
        res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/occasions/events/add
// @desc    Add Event
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateEvent(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const event = {
        // @ts-expect-error
        institute_id: req.user.institute_id,
        date_of_event_from: req.body.date_of_event_from,
        date_of_event_to: req.body.date_of_event_to,
        reason: req.body.reason,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
      };

      conn.query(
        "INSERT INTO events (institute_id, date_of_event_from, date_of_event_to, reason, date_of_creation, time_of_creation) VALUES (?, ?, ?, ?, ?, ?);",
        [
          event.institute_id,
          event.date_of_event_from,
          event.date_of_event_to,
          event.reason,
          event.date_of_creation,
          event.time_of_creation,
        ],
        (err, rows) => {
          if (err) {
            console.log("Query Error : ", err);
            res.status(400).json({ success: false });
          } else
            res.status(200).json({ success: true, message: "Event posted." });
        }
      );
    }
  }
);

module.exports = router;
