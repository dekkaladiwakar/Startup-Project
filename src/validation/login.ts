import validator from "validator";
const isEmpty = require("./is-empty");

const validateLoginInput = (data: any) => {
  let errors: any = {};

  data.institute_id = !isEmpty(data.institute_id) ? data.institute_id : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.institute_id, { min: 6, max: 12 })) {
    errors.institute_id = "Re-check your Institute ID";
  }

  if (validator.isEmpty(data.institute_id)) {
    errors.institute_id = "Institute ID is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 12 })) {
    errors.password = "Re-check your password.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
