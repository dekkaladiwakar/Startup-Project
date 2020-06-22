import validator from "validator";

const isEmpty = require("../is-empty");

const validateEvent = (data: any) => {
  let errors: any = {};

  data.reason = !isEmpty(data.reason) ? data.reason : "";
  data.date_of_event_from = !isEmpty(data.date_of_event_from)
    ? data.date_of_event_from
    : "";
  data.date_of_event_to = !isEmpty(data.date_of_event_to)
    ? data.date_of_event_to
    : "";

  if (!validator.isLength(data.reason, { max: 255 })) {
    errors.reason = "Reason Max Length (255 Letters).";
  }

  if (validator.isEmpty(data.reason)) {
    errors.reason = "Reason is required.";
  }

  if (
    // @ts-expect-error
    !validator.isISO8601(data.date_of_event_from, (options = { strict: true }))
  ) {
    errors.date_of_event_from = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }

  if (validator.isEmpty(data.date_of_event_from)) {
    errors.date_of_event_from = "Date Required.";
  }

  if (
    !validator.isEmpty(data.date_of_event_to) &&
    // @ts-expect-error
    !validator.isISO8601(data.date_of_event_to, (options = { strict: true }))
  ) {
    errors.date_of_event_to = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateEvent;
