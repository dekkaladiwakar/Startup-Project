const conn = require("../../../config/connection");
const { genSalt, hash } = require("bcryptjs");

// Current Date & Time
const current_dateTime = new Date();
const curr_date = current_dateTime.toLocaleDateString();
const curr_time = current_dateTime.toLocaleTimeString();

const userRegister = (data) =>
  new Promise((resolve, reject) => {
    const institute = {
      institute_id: data.institute_id,
      password: data.password,
      institute_name: data.institute_name,
      institute_principal: data.institute_principal,
      email: data.email,
      education_type: data.education_type,
      phone_number: data.phone_number,
      address: data.address,
      pincode: data.pincode,
      state: data.state,
      city: data.city,
      date_of_creation: curr_date,
      time_of_creation: curr_time,
    };
    genSalt(10, (err, salt) => {
      if (err) {
        console.log("GenSalt Error : " + err);
      }
      hash(institute.password, salt, (err, hash) => {
        if (err) {
          console.log("Hash Error : " + err);
        }
        institute.password = hash;

        // Need to be converted into JSON String for DB to consider it as JSON object
        const instituteJSON = JSON.stringify(institute);

        conn.query(
          `call insert_management_details(?, @message, @success); select @message, @success`,
          instituteJSON,
          (err, rows) => {
            if (err) {
              console.log("Procedure Error : " + err);
              reject({
                success: false,
                message: "Unexpected Error. Sorry for the inconvenience.",
              });
            } else {
              console.log("Insert_Managemet_Details Procedure executed!");
              const result = { success: "", message: "" };

              rows[1][0]["@success"] === 1
                ? ((result.success = true),
                  (result.message = rows[1][0]["@message"]))
                : ((result.success = false),
                  (result.message = rows[1][0]["@message"]));
              resolve(result);
            }
          }
        );
      });
    });
  });

module.exports = userRegister;
