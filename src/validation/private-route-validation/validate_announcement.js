const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateAnnouncement = (data) => {
  let errors = {};

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
