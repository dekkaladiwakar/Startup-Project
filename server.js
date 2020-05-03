require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const insert_data = require("./routes/api/insert_data");
const management = require("./routes/api/management");

const conn = require("./config/connection");

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected to the MySql Database.");
  }
});
*/

app.get("/", (req, res) => {
  conn.getConnection((err, tempCon) => {
    tempCon.query("SELECT * FROM students", (err, rows, fields) => {
      if (err) {
        console.log("Error!");
      } else {
        res.json(rows);
      }
    });
  });
});

// Use Routes
app.use("/api/users", users);
app.use("/api/insert", insert_data);
app.use("/api/management", management);

const port = process.env.PORT || process.env.USER_PORT;

app.listen(port, (req, res) => {
  console.log(`The server is running on port ${port}......`);
});
