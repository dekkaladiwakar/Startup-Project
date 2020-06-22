const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateClassInput = (data) => {
  let errors = {};

  data.class_name = !isEmpty(data.class_name) ? data.class_name : "";
  data.section_name = !isEmpty(data.section_name) ? data.section_name : "";

  if (!validator.isLength(data.class_name, { min: 1, max: 15 })) {
    errors.class_name = "Full name -> No: of characters (1 - 15)";
  }

  if (validator.isEmpty(data.class_name)) {
    errors.class_name = "Full name is required.";
  }

  if (!validator.isLength(data.section_name, { min: 1, max: 15 })) {
    errors.section_name = "Section name -> No: of characters (1 - 15)";
  }

  if (validator.isEmpty(data.section_name)) {
    errors.section_name = "Section name is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
