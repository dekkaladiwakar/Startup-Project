const express = require("express");
const { genSalt, compare, hash } = require("bcryptjs");

const router = express.Router();

// Load DB Connection
const conn = require("../../config/connection");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");

// Current Date & Time
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

// @route   POST api/users/register
// @desc    School Register
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const institute = {
    institute_id: req.body.institute_id,
    password: req.body.password,
    institute_name: req.body.institute_name,
    institute_principal: req.body.institute_principal,
    education_type: req.body.education_type,
    phone_number: req.body.phone_number,
    address: req.body.address,
    area: req.body.area,
    state: req.body.state,
    city: req.body.city,
    date_of_creation: curr_date,
    time_of_creation: curr_time,
  };

  genSalt(10, (err, salt) => {
    if (err) {
      console.log("GenSalt Error : " + err);
    }
    hash(institute.password, salt, (err, hash) => {
      if (err) {
        console.log("Hash Error : " + err);
      }
      institute.password = hash;
      const instituteJSON = JSON.stringify(institute);

      conn.query(
        `call insert_management_details(?, @message, @success); select @message, @success`,
        instituteJSON,
        (err, rows) => {
          if (err) {
            console.log("Procedure Error : " + err);
          } else {
            console.log("Procedure executed!");
            res.json({
              success: rows[1][0]["@success"],
              message: rows[1][0]["@message"],
            });
          }
        }
      );
    });
  });
});

module.exports = router;
