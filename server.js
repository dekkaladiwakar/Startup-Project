require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

// Custom Routes
const users = require("./routes/api/users");
const dashboard = require("./routes/api/private/dashboard");
const classes = require("./routes/api/private/classes/index");
const students = require("./routes/api/private/students/index");
const teachers = require("./routes/api/private/teachers/index");
const occasions = require("./routes/api/private/occasions/index");
const attendence = require("./routes/api/private/attendence");
const announcements = require("./routes/api/private/occasions/announcement");
const holidays = require("./routes/api/private/occasions/holiday");

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
app.use("/api/u/classes", classes);
app.use("/api/u/classes/students", students);
app.use("/api/u/teachers", teachers);
app.use("/api/u/attendence", attendence);
app.use("/api/u/occasions", occasions);
app.use("/api/u/occasions/announcements", announcements);
app.use("/api/u/occasions/holidays", holidays);

const port = process.env.PORT || process.env.USER_PORT;

// Incoming requests listener
app.listen(port, (req, res) => {
  console.log(`The server is running on port ${port}......`);
});
