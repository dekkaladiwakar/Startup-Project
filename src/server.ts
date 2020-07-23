require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "./swagger.json";

// Custom Routes
const users = require("./routes/api/users");
const dashboard = require("./routes/api/private/dashboard");
const classes = require("./routes/api/private/classes/index");
const students = require("./routes/api/private/students/index");
const teachers = require("./routes/api/private/teachers/index");
const occasions = require("./routes/api/private/occasions/index");
const attendence = require("./routes/api/private/attendance");
const announcements = require("./routes/api/private/occasions/announcement");
const holidays = require("./routes/api/private/occasions/holiday");
const exams = require("./routes/api/private/exams/index");
const tests = require("./routes/api/private/tests/index");
const homework = require("./routes/api/private/homework/index");
const timetable = require("./routes/api/private/timetable/index");

const app = express();

//Swagger Setup

const swaggerOptions = {
  swaggerDefinition: swaggerDocument,
  // ['.routes/*.*]
  apis: [
    "./src/server.ts",
    "./src/routes/api/userDoc.yaml",
    "./src/routes/api/private/*/*Doc.yaml",
  ],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

// Use static files in public folder
app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - Home
 *    descrption: Main Page of the website
 *    responses:
 *      '200':
 *        description: "Successfully loaded."
 */
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
app.use("/api/u/exams", exams);
app.use("/api/u/tests", tests);
app.use("/api/u/homework", homework);
app.use("/api/u/timetable", timetable);

const port = process.env.PORT || process.env.USER_PORT;

// Incoming requests listener
app.listen(port, () => {
  console.log(`The server is running on port ${port}......`);
});
