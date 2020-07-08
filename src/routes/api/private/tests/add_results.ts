import { Pool } from "mysql";

const conn: Pool = require("../../../../config/connection");

const addResult = (data: {}) =>
  new Promise((resolve, reject) => {
    conn.query(
      "CALL AddTestResult(?, @message, @result); SELECT @message, @result;",
      data,
      (err, rows) => {
        if (err) {
          console.log("Procedure Error : ", err);
          reject({
            success: false,
            message: "Sorry for the inconvenience. Please try again later.",
          });
        } else {
          console.log("Add_Results Procedure Executed.");
          const result = {
            success: true,
            message: "",
          };

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

module.exports = addResult;
