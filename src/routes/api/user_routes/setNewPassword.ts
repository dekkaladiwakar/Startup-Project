import { genSalt, hash } from "bcryptjs";

const setNewPassword = (data: string) =>
  new Promise((resolve, reject) => {
    genSalt(10, (err, salt) => {
      if (err) {
        console.log("genSalt Error : ", err);
        reject({
          success: false,
          message:
            "Sorry for the inconvenince. Please try again after sometime.",
        });
      }

      hash(data, salt, (err, hash) => {
        if (err) {
          console.log("Hash Error : ", err);
          reject({
            success: false,
            message:
              "Sorry for the inconvenince. Please try again after sometime.",
          });
        }
        resolve(hash);
      });
    });
  });

module.exports = setNewPassword;
