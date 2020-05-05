const conn = require(".././../../config/connection");
const { compare } = require("bcryptjs");

const userLogin = (data) =>
  new Promise((resolve, reject) => {
    const institute_id = data.institute_id;
    const password = data.password;

    const find_id = "SELECT * FROM institutes WHERE institute_id = ?";

    conn.getConnection((err, tempCon) => {
      if (err) console.log("Connection Error : " + err);

      tempCon.query(find_id, institute_id, (err, rows, fields) => {
        if (err) {
          console.log("Query Error : " + err);
        }

        if (Object.keys(rows).length !== 0) {
          compare(password, rows[0].password)
            .then((res) => {
              if (res === true) {
                resolve({
                  success: true,
                  message: "Successfully Logged In",
                  rows,
                });
              } else {
                reject({
                  success: false,
                  message:
                    "Incorrect username (or) password. Please Try again!",
                });
              }
            })
            .catch((err) => console.log("Compare Error : " + err));
        } else {
          reject({
            success: false,
            message: "Incorrect username (or) password. Please Try again!",
          });
        }
      });
    });
  });

module.exports = userLogin;
