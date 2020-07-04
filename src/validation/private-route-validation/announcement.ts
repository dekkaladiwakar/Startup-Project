import validator from "validator";

const isEmpty = require("../is-empty");

const validateAnnouncement = (data: any) => {
  let errors: any = {};

  data.content = !isEmpty(data.content) ? data.content : "";

  if (!validator.isLength(data.content, { max: 255 })) {
    errors.content = "Content Max Length (255 Letters).";
  }

  if (validator.isEmpty(data.content)) {
    errors.content = "Content is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAnnouncement;
