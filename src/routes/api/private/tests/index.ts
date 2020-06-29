import express, { Router } from "express";
import passport from "passport";

const router: Router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("Test Page. * Display available tests *");
  }
);

router.post(
  "/addTest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
