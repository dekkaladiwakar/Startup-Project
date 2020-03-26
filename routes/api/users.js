const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const app = express();

// @route   GET api/users
// @desc    test route
// @access  Public

router.get("/", (req, res) => {
  res.json({ msg: "Route Works!" });
});

module.exports = router;
