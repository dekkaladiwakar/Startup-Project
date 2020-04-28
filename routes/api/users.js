const express = require("express");
const bcryptjs = require("bcryptjs");

const router = express.Router();

const conn = require("../../config/connection");

const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

// @route   GET api/users
// @desc    test route
// @access  Public
router.get("/", (req, res) => {
  conn.getConnection((err, tempCon) => {
    tempCon.query("CALL TestProcedureOne()", (err, rows, fields) => {
      tempCon.release();
      if (err) {
        console.log("Error!" + err);
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  });
});

// @route   POST api/registerST
// @desc    register student and teacher
// @access  Private

router.post("/registerST", (req, res) => {
  const person = {
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    dob: req.body.dob,
    phone_number: req.body.phone_number,
    date_of_creation: curr_date,
    time_of_creation: curr_time,
  };

  const parent = {
    first_name: req.body.p_first_name,
    middle_name: req.body.p_middle_name,
    last_name: req.body.p_last_name,
    gender: req.body.p_gender,
    dob: req.body.p_dob,
    phone_number: req.body.p_phone_number,
    date_of_creation: curr_date,
    time_of_creation: curr_time,
  };

  const person_type = req.body.person_type;

  // MYSQL Query Statements
  const insert_query_student = "INSERT INTO students SET ?";
  const insert_query_parents = "INSERT INTO parents SET ?";
  const insert_query_teacher = "INSERT INTO teachers SET ?";

  conn.getConnection((err, tempCon) => {
    if (err) {
      console.log("Connection Error -> " + err);
    }

    if (person_type === "student") {
      tempCon.query(insert_query_student, person, (err, rows) => {
        if (err) {
          console.log("Query Error -> " + err);
        } else {
          console.log("Student Query Successfully Inserted!");
          res.json({ row: rows });
        }
      });
    } else if (person_type === "teacher") {
      tempCon.query(insert_query_teacher, person, (err, rows) => {
        if (err) {
          console.log("Query Error -> " + err);
        } else {
          console.log("Teacher Query Successfully Inserted!");
          res.json({ row: rows });
        }
      });
    }
  });
});

// @route   GET api/users/login
// @desc    School Login
// @access  Public
router.get("/login", (req, res) => {});

// @route   GET api/users/register
// @desc    School Register
// @access  Public
router.get("/register", (req, res) => {
  const institute = {
    institute_id: req.body.institute_id, // must be given by us to the institute for now.
    institute_name: req.body.institute_name,
    institute_principal: req.body.institute_principal,
    education_type: req.body.education_type,
    phone_number: req.body.phone_number,
    date_of_join: curr_date + " , " + curr_time,
  };

  const address = {
    address: req.body.address,
    area: req.body.area,
    state: req.body.state,
    city: req.body.city,
  };
});

module.exports = router;
