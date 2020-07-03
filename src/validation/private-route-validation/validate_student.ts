import validator from "validator";

const isEmpty = require("../is-empty");

const validateStudentInput = (data: any) => {
  let errors: any = {};

  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.date_from = !isEmpty(data.date_from) ? data.date_from : "";
  data.date_to = !isEmpty(data.date_to) ? data.date_to : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.father = !isEmpty(data.father) ? data.father : "";
  data.mother = !isEmpty(data.mother) ? data.mother : "";
  data.occupation_father = !isEmpty(data.occupation_father)
    ? data.occupation_father
    : "";
  data.occupation_mother = !isEmpty(data.occupation_mother)
    ? data.occupation_mother
    : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.p_email = !isEmpty(data.p_email) ? data.p_email : "";
  data.primary_number = !isEmpty(data.primary_number)
    ? data.primary_number
    : "";
  data.secondary_number = !isEmpty(data.secondary_number)
    ? data.secondary_number
    : "";

  if (!validator.isLength(data.full_name, { min: 3, max: 50 })) {
    errors.full_name = "Full name -> No: of characters (3 - 50)";
  }

  if (validator.isEmpty(data.full_name)) {
    errors.full_name = "Full name is required.";
  }

  if (!validator.isLength(data.father, { min: 3, max: 50 })) {
    errors.father = "Father name -> No: of characters (3 - 50)";
  }

  if (!validator.isLength(data.mother, { min: 3, max: 50 })) {
    errors.mother = "Mother name -> No: of characters (3 - 50)";
  }

  if (validator.isEmpty(data.father) && validator.isEmpty(data.mother)) {
    errors.father = "At least one guardian name is required.";
    errors.mother = "At least one guardian name is required.";
  }

  if (!validator.isLength(data.occupation_father, { min: 2, max: 50 })) {
    errors.occupation_father = "Occupation -> No: of characters (2 - 50)";
  }

  if (!validator.isLength(data.occupation_mother, { min: 2, max: 50 })) {
    errors.occupation_mother = "Occupation -> No: of characters (2 - 50)";
  }

  if (
    validator.isEmpty(data.occupation_father) &&
    validator.isEmpty(data.occupation_mother)
  ) {
    errors.occupation_father =
      "At least one guardian's occupation is required.";
    errors.occupation_mother =
      "At least one guardian's occupation is required.";
  }

  if (!validator.isLength(data.address, { min: 10, max: 500 })) {
    errors.address = "Address-> No: of characters (10 - 500)";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address is required.";
  }
  if (
    !validator.isEmpty(data.gender) &&
    !validator.isLength(data.gender, { max: 1 })
  ) {
    errors.gender = "Gender -> No: of characters (1)";
  }

  // @ts-expect-error
  if (!validator.isISO8601(data.dob, (options = { strict: true }))) {
    errors.dob = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }

  if (validator.isEmpty(data.dob)) {
    errors.dob = "Date of Birth is required.";
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

  if (
    !validator.isEmpty(data.p_email) &&
    !validator.isLength(data.p_email, { min: 5, max: 40 })
  ) {
    errors.p_email =
      "Email can't exceed 40 characters, minimum characters = 5.";
  }

  if (!validator.isEmail(data.email) && !validator.isEmpty(data.email)) {
    errors.email = "Invalid Email.";
  }

  if (!validator.isEmail(data.p_email) && !validator.isEmpty(data.p_email)) {
    errors.p_email = "Invalid Email.";
  }

  if (!validator.isLength(data.phone_number, { min: 7, max: 20 })) {
    errors.phone_number =
      "Phone Number can't exceed 20 characters, minimum characters = 7.";
  }

  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = "Phone Number is required.";
  }

  if (!validator.isLength(data.primary_number, { min: 7, max: 20 })) {
    errors.primary_number =
      "Phone Number can't exceed 20 characters, minimum characters = 7.";
  }

  if (validator.isEmpty(data.primary_number)) {
    errors.primary_number = "Phone Number is required.";
  }

  if (
    !validator.isEmpty(data.secondary_number) &&
    !validator.isLength(data.secondary_number, { min: 7, max: 20 })
  ) {
    errors.secondary_number =
      "Phone Number can't exceed 20 characters, minimum characters = 7.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudentInput;
