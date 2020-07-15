import { Pool } from "mysql";

const conn: Pool = require("../../../../config/connection");

const addAttendance = (data: {}) =>
  new Promise((resolve, reject) => {
    conn.query(
      "CALL AddAttendance(?, @message, @result); SELECT @message, @result;",
      data,
      (err, rows) => {
        if (err) {
          console.log("Query Error : ", err);
          reject({
            success: false,
            message: "Unexpected Error. Sorry for the inconvenience.",
          });
        } else {
          console.log("Add_Attendance Procedure Executed.");
          const result = { success: true, message: "" };

          rows[1][0]["@result"] === 1
            ? ((result.success = true),
              (result.message = rows[1][0]["@message"]))
            : ((result.success = false),
              (result.message = rows[1][0]["@message"]));
          resolve(result);
        }
      }
    );
  });

module.exports = addAttendance;
