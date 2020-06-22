const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateTeacherLoginInput = (data) => {
  let errors = {};

  data.login_id = !isEmpty(data.login_id) ? data.login_id : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.login_id, { min: 6, max: 12 })) {
    errors.login_id = "Re-check your Login ID";
  }

  if (validator.isEmpty(data.login_id)) {
    errors.login_id = "Login ID is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 12 })) {
    errors.password = "Re-check your password. Length (6-12 Characters)";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
