const express = require("express");
const mysql = require("mysql");

const users = require("./routes/api/users");

const app = express();

const connection = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "startupDB"
});

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
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      console.log("Error!");
    } else {
      console.log("Successfully connected!");
    }

    tempCon.query("SELECT * FROM students", (err, rows, fields) => {
      tempCon.release();
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

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`The server is running on port ${port}......`);
});
