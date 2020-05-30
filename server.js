require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const dashboard = require("./routes/api/private/dashboard");
const section = require("./routes/api/private/classes/section");
const teachers = require("./routes/api/private/teachers/index");

const app = express();

// Use static files in public folder
app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route   GET www.tyudent.com
// @desc    Main page
// @access  Public
app.get("/", (req, res) => {
  res.sendFile("main.html", { root: __dirname + "/./public/html" });
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/u/dashboard", dashboard);
app.use("/api/u/classes", section);
app.use("/api/u/teachers", teachers);

const port = process.env.PORT || process.env.USER_PORT;

// Incoming requests listener
app.listen(port, (req, res) => {
  console.log(`The server is running on port ${port}......`);
});
