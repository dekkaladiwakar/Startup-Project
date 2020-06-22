import validator from "validator";

const isEmpty = require("../is-empty");

const validateTeacherInput = (data: any) => {
  let errors: any = {};

  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.date_from = !isEmpty(data.date_from) ? data.date_from : "";
  data.date_to = !isEmpty(data.date_to) ? data.date_to : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

  if (!validator.isLength(data.full_name, { min: 3, max: 50 })) {
    errors.full_name = "Full name -> No: of characters (3 - 50)";
  }

  if (validator.isEmpty(data.full_name)) {
    errors.full_name = "Full name is required.";
  }

  if (
    !validator.isEmpty(data.date_from) &&
    // @ts-expect-error
    !validator.isISO8601(data.date_from, (options = { strict: true }))
  ) {
    errors.date_from = "Invalid Date. **Format (YYYY-MM-DD)";
  }

  if (
    !validator.isEmpty(data.date_to) &&
    // @ts-expect-error
    !validator.isISO8601(data.date_to, (option = { strict: true }))
  ) {
    errors.date_to = "Invalid Date. **Format (YYYY-MM-DD)";
  }

  if (
    !validator.isEmpty(data.email) &&
    !validator.isLength(data.email, { min: 5, max: 40 })
  ) {
    errors.email = "Email can't exceed 40 characters, minimum characters = 5.";
  }

  if (!validator.isEmail(data.email) && !validator.isEmpty(data.email)) {
    errors.email = "Invalid Email.";
  }

  if (!validator.isLength(data.phone_number, { min: 7, max: 20 })) {
    errors.phone_number =
      "Phone Number can't exceed 20 characters, minimum characters = 7.";
  }

  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = "Phone Number is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateTeacherInput;
