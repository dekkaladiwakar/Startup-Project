import express from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";

// Keys File
import { secretOrKey } from "../../config/keys";

const router = express.Router();

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateTeacherLoginInput = require("../../validation/teacherLogin");

// User Routes
const managementLogin = require("./user_routes/management.login");
const managementRegister = require("./user_routes/management.register");
const teacherLogin = require("./user_routes/teacher.login");

// @route   GET /api/users
// @desc    Index page
// @access  Private
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/../../public/html" });
});

// @route   GET /api/users/register
// @desc    Register page
// @access  Private
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: __dirname + "/../../public/html" });
});

// @route   GET /api/users/login
// @desc    Login page
// @access  Private
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: __dirname + "/../../public/html" });
});

// @route   POST /api/users/login
// @desc    Institute Login
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    managementLogin(req.body)
      .then((data: any) => {
        // JWT Payload
        const payload = {
          institute_id: data.rows[1].institute_id,
          institute_name: data.rows[1].institute_name,
          institute_principal: data.rows[1].institute_principal,
          email: data.rows[1].email,
          education_type: data.rows[1].education_type,
          phone_number: data.rows[1].phone_number,
          address: data.rows[2].address,
          pincode: data.rows[2].pincode,
          city: data.rows[2].city,
          state: data.rows[2].state,
        };

        // Sign Token
        sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: data.rows[0].status,
            message: data.message,
            token: "Bearer " + token,
          });
        });
      })
      .catch((err: {}) => res.status(400).json(err));
  }
});

// @route   POST /api/users/teacherLogin
// @desc    Teacher Login
// @access  Public
router.post("/teacherLogin", (req, res) => {
  const { errors, isValid } = validateTeacherLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    teacherLogin(req.body)
      .then((data: any) => {
        // JWT Payload
        const payload = {
          teacher_id: data.rows[1].teacher_id,
          full_name: data.rows[1].full_name,
          email: data.rows[1].email,
          phone_number: data.rows[1].phone_number,
          date_of_creation: data.rows[1].date_of_creation,
          time_of_creation: data.rows[1].time_of_creation,
          institute_id: data.rows[2].institute_id,
          date_from: data.rows[2].date_from,
          date_to: data.rows[2].date_to,
        };

        // Sign Token
        sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: data.rows[0].status,
            message: data.message,
            token: "Bearer " + token,
          });
        });
      })
      .catch((err: {}) => res.status(400).json(err));
  }
});

// @route   POST /api/users/register
// @desc    School register
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    managementRegister(req.body)
      .then((data: {}) => {
        res.status(200).json(data);
      })
      .catch((err: {}) => res.status(500).json(err));
  }
});

// @route   POST /api/users/checkToken
// @desc    Checking payload
// @access  Private
router.get(
  "/checkToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

module.exports = router;
