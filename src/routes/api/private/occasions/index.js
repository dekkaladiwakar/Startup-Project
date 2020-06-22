const express = require("express");
const passport = require("passport");

const router = express.Router();

// @route   GET /api/u/occasions
// @desc    Occasion's Page
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Occasion's Page");
  }
);

module.exports = router;
