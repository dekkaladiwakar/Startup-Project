const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  // If empty assigning it to empty string
  // since validator only checks for string types

  data.address = !isEmpty(data.address) ? data.address : "";
  data.area = !isEmpty(data.area) ? data.area : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.institute_id = !isEmpty(data.institute_id) ? data.institute_id : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.institute_name = !isEmpty(data.institute_name)
    ? data.institute_name
    : "";
  data.institute_principal = !isEmpty(data.institute_principal)
    ? data.institute_principal
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.education_type = !isEmpty(data.education_type)
    ? data.education_type
    : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

  if (!validator.isLength(data.address, { min: 5, max: 250 })) {
    errors.address =
      "Address can't exceed 250 characters, minimum characters = 5.";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address is required.";
  }

  if (!validator.isLength(data.area, { min: 3, max: 40 })) {
    errors.area = "Area can't exceed 40 characters, minimum characters = 3.";
  }

  if (validator.isEmpty(data.area)) {
    errors.area = "Area is required.";
  }

  if (!validator.isLength(data.city, { min: 3, max: 20 })) {
    errors.city = "City can't exceed 20 characters, minimum characters = 3.";
  }

  if (validator.isEmpty(data.city)) {
    errors.city = "City is required.";
  }

  if (!validator.isLength(data.state, { min: 3, max: 30 })) {
    errors.state = "State can't exceed 30 characters, minimum characters = 3.";
  }

  if (validator.isEmpty(data.state)) {
    errors.state = "State is required.";
  }

  if (!validator.isLength(data.institute_id, { min: 6, max: 12 })) {
    errors.institute_id =
      "Institute ID length must be between 6 - 12 characters.";
  }

  if (validator.isEmpty(data.institute_id)) {
    errors.institute_id = "Institute ID is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 12 })) {
    errors.password = "Password must be of length 6 - 12 characters.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!validator.isLength(data.password2, { min: 6, max: 12 })) {
    errors.password2 = "Password must be of length 6 - 12 characters.";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required.";
  }

  if (!validator.isLength(data.institute_name, { min: 6, max: 50 })) {
    errors.institute_name =
      "School name can't exceed 50 characters, minimum characters = 6.";
  }

  if (validator.isEmpty(data.institute_name)) {
    errors.institute_name = "Institute name is required.";
  }

  if (!validator.isLength(data.institute_principal, { min: 5, max: 30 })) {
    errors.institute_principal =
      "Principal name can't exceed 30 characters, minimum characters = 5.";
  }

  if (validator.isEmpty(data.institute_principal)) {
    errors.institute_principal = "Principal Name is required.";
  }

  if (!validator.isLength(data.email, { min: 5, max: 40 })) {
    errors.email = "Email can't exceed 40 characters, minimum characters = 5.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (!validator.isLength(data.education_type, { min: 6, max: 30 })) {
    errors.education_type =
      "Education Type can't exceed 30 characters, minimum characters = 6.";
  }

  if (validator.isEmpty(data.education_type)) {
    errors.education_type = "Education Type is required.";
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
