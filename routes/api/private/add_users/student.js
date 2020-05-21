const conn = require("../../../../config/connection");
const bcryptjs = require("bcryptjs");

const insert_query = "";
const addStudent = (data = new Promise((resolve, reject) => {
  conn.getConnection((err, tempCon) => {
    if (err) {
      console.log("Connection Error : " + err);
    }

    tempCon.query();
  });
}));
