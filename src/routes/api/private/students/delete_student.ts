import { Pool } from "mysql";

const conn: Pool = require("../../../../config/connection");

const deleteStudent = (data: {}) =>
  new Promise((resolve, reject) => {
    conn.query(
      `CALL DeleteStudent(?, @message, @result); SELECT @message, @result;`,
      data,
      (err, rows) => {
        if (err) {
          console.log("Procedure Error : " + err);
          reject({
            success: false,
            message: "Unexpected Error. Sorry for the inconvenience.",
          });
        } else {
          console.log("Delete_Student Procedure Executed.");
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

module.exports = deleteStudent;
