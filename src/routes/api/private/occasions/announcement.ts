import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Validation
const validateAnnouncement = require("../../../../validation/private-route-validation/announcement");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET /api/u/occasions/announcements
// @desc    Announcement Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Announcement Page");
  }
);

// @route   GET /api/u/occasions/announcements/all
// @desc    Display all announcements
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT institute_name, content, date_of_creation FROM announcements WHERE institute_id = ?",
      // @ts-expect-error
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error: " + err);
        res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/occasions/announcements/add
// @desc    Add announcements
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateAnnouncement(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      // ancmt = announcement
      const ancmt = {
        // @ts-expect-error
        institute_id: req.user.institute_id,
        // @ts-expect-error
        institute_name: req.user.institute_name,
        content: req.body.content,
        date_of_creation: curr_date,
        time_of_creation: curr_time,
      };

      conn.query(
        "INSERT INTO announcements (institute_id, institute_name, content, date_of_creation, time_of_creation) VALUES (?, ?, ?, ?, ?);",
        [
          ancmt.institute_id,
          ancmt.institute_name,
          ancmt.content,
          ancmt.date_of_creation,
          ancmt.time_of_creation,
        ],
        (err, rows) => {
          if (err) {
            console.log("Query Error : ", err);
            res.status(400).json({ success: false });
          } else
            res
              .status(200)
              .json({ success: true, message: "Announcement posted." });
        }
      );
    }
  }
);

module.exports = router;
