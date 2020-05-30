const conn = require("../../../../config/connection");

module.exports = addTeacher = (data) =>
  new Promise((resolve, reject) => {
    conn.query(
      "CALL add_teachers(?, @message, @result); SELECT @message, @result;",
      data,
      (err, rows) => {
        if (err) {
          console.log("Query Error : " + err);
          reject({
            success: false,
            message: "Unexpected Error. Sorry for the inconvenience.",
          });
        } else {
          console.log("Add_Teachers Procedure Executed.");
          const result = { success: "", message: "" };

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
