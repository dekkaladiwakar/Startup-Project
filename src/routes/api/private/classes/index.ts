import express from "express";
import passport from "passport";
import { Pool } from "mysql";

const router = express.Router();

// DB Connection
const conn: Pool = require("../../../../config/connection");

// Custom routes
const addClass = require("./add_class");

// Validation
const validateClassInput = require("../../../../validation/private-route-validation/class");

// @route   GET /api/u/classes
// @desc    Class page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Class -> Main Page");
  }
);

// @route   GET /api/u/classes/all
// @desc    get all available classes
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    conn.query(
      "SELECT class, section, class_name " +
        "FROM classes " +
        "INNER JOIN institute_classes " +
        "ON classes.class_id = institute_classes.class_id " +
        "WHERE institute_id = ? ",
      // @ts-expect-error
      req.user.institute_id,
      (err, rows) => {
        if (err) console.log("Query Error : " + err);
        else res.status(200).json(rows);
      }
    );
  }
);

// @route   POST /api/u/classes/add
// @desc    Add class
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateClassInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const class_details = {
        //@ts-expect-error
        institute_id: req.user.institute_id,
        teacher_id: req.body.homeroom_teacher_id,
        class: req.body.class,
        section: req.body.section,
      };

      // Need to be converted into JSON String for DB to consider it as JSON object
      const classJSON = JSON.stringify(class_details);

      addClass(classJSON)
        .then((data: {}) => res.status(200).json(data))
        .catch((err: {}) => res.status(400).json(err));
    }
  }
);

module.exports = router;
