import { compare } from "bcryptjs";
import { Pool } from "mysql";

const conn: Pool = require("../../../config/connection");

const managementLogin = (data: { institute_id: string; password: string }) =>
  new Promise((resolve, reject) => {
    const institute_id = data.institute_id;
    const password = data.password;

    conn.query(
      "CALL management_login(?, @result); select @result",
      institute_id,
      (err, rows) => {
        if (err) {
          console.log("Query Error : " + err);
          reject({
            success: false,
            message: "Incorrect username (or) password. Please Try again!",
          });
        }
        // Setting Obj to data recieved from Mysql procedure excluding OkPacket Row.
        let obj = JSON.parse(rows[1][0]["@result"]);

        //To access the user details of JSON object returned from mysql procedure.
        // Obj[0] contains status details.
        // obj[1] contains institute details
        // Obj[2] contains Addresses details

        // To delete a JSON object
        // obj_name = new Object;

        if (obj[0].status === true) {
          compare(password, obj[1].password)
            .then((res) => {
              if (res === true) {
                delete obj[1]["password"];
                resolve({
                  message: "Successfully Logged In",
                  rows: obj,
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
            success: obj[0].status,
            message:
              "Incorrect username (or) password. Please Try again! (No result set)",
          });
        }
      }
    );
  });

module.exports = managementLogin;
