const express = require("express");
const router = express.Router();

const conn = require("../../config/connection");

const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

const insert_query = "INSERT INTO students SET ?";

// @route   POST api/insert
// @desc    test route
// @access  Public
router.post("/", (req, res) => {
  conn.getConnection((err, tempCon) => {
    tempCon.query(insert_query, student, (err, rows, fields) => {
      if (err) {
        console.log("error! " + err);
      } else {
        console.log("Successfully inserted!");
        res.json(rows);
      }
    });
  });
});

module.exports = router;
