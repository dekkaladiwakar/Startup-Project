const { compare } = require("bcryptjs");

// Custom Routes
const setNewPassword = require("./setNewPassword");

// DB Connection
const conn = require("../../../config/connection");

const teacherLogin = (data) =>
  new Promise((resolve, reject) => {
    const login_id = data.login_id;
    const password = data.password;

    conn.query(
      "CALL teacher_login(?, @result); SELECT @result;",
      login_id,
      (err, rows) => {
        if (err) {
          console.log("Query Error : ", err);
          reject({
            success: false,
            message: "Sorry for the inconvenience. Please try again later.!",
          });
        }

        // Setting Obj to data recieved from Mysql procedure excluding OkPacket Row.
        let obj = JSON.parse(rows[1][0]["@result"]);

        //To access the user details of JSON object returned from mysql procedure.
        // Obj[0] contains status details.
        // obj[1] contains teacher details
        // Obj[2] contains teacher_institute details

        // To delete a JSON object
        // obj_name = new Object;

        const checkPassword = obj[1].password;

        // New user password set
        if (obj[0].status === true && checkPassword === null) {
          console.log("New user!");
          setNewPassword(password)
            .then((data) => {
              conn.query(
                "UPDATE teachers SET password = ? WHERE teacher_id = ?",
                [data, obj[1].teacher_id],
                (err) => {
                  if (err) {
                    console.log("Query Error : ", err);
                    reject({
                      success: false,
                      message:
                        "Sorry for the inconvenince. Please try again after sometime.",
                    });
                  }

                  delete obj[1]["password"];
                  resolve({
                    rows: obj,
                    success: true,
                    message: "New password set. Welcome to Tyudent!",
                  });
                }
              );
            })
            .catch((err) => {
              console.log("SetNewPassword Error : ", err);
              reject(err);
            });
        } else {
          // Login Password check
          if (obj[0].status === true && checkPassword !== null) {
            compare(password, obj[1].password)
              .then((res) => {
                if (res === true) {
                  delete obj[1]["password"];
                  resolve({
                    rows: obj,
                    success: true,
                    message: "Successfully Logged In",
                  });
                } else {
                  reject({
                    success: false,
                    message:
                      "Incorrect username (or) password. Please Try again!",
                  });
                }
              })
              .catch((err) => {
                console.log("Compare Error : " + err);
                reject({
                  success: false,
                  message:
                    "Sorry for the inconvenince. Please try again after sometime.",
                });
              });
          } else {
            // Procedure success : False
            reject({
              success: obj[0].status,
              message: "User doesn't exist. Please contact us.",
            });
          }
        }
      }
    );
  });

module.exports = teacherLogin;
