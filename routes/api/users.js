const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Load DB Connection
const conn = require("../../config/connection");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User Routes
const userLogin = require("./user_routes/user.login");
const userRegister = require("./user_routes/user.register");

// @route   GET api/users/
// @desc    Sending index.html File
// @access  Public
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/../../public/html" });
});

// @route   GET api/users/register
// @desc    Sending register.html File
// @access  Public
router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: __dirname + "/../../public/html" });
});
// @route   GET api/users/login
// @desc    Sending login.html File
// @access  Public
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: __dirname + "/../../public/html" });
});

// @route   POST api/users/login
// @desc    School Login
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    userLogin(req.body)
      .then((data) => {
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
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: data.rows[0].status,
              message: data.message,
              token: "Bearer " + token,
            });
          }
        );
      })
      .catch((err) => res.status(400).json(err));
  }
});

// @route   POST api/users/register
// @desc    School Register
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    userRegister(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = router;
