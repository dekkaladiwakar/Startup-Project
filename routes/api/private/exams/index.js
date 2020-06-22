const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Exam Page");
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
