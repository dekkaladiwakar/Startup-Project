import validator from "validator";

const isEmpty = require("../is-empty");

const validateHoliday = (data: any) => {
  let errors: any = {};

  data.reason = !isEmpty(data.reason) ? data.reason : "";
  data.date_of_holiday_from = !isEmpty(data.date_of_holiday_from)
    ? data.date_of_holiday_from
    : "";
  data.date_of_holiday_to = !isEmpty(data.date_of_holiday_to)
    ? data.date_of_holiday_to
    : "";

  if (!validator.isLength(data.reason, { max: 255 })) {
    errors.reason = "Reason Max Length (255 Letters).";
  }

  if (validator.isEmpty(data.reason)) {
    errors.reason = "Reason is required.";
  }

  if (
    !validator.isISO8601(
      data.date_of_holiday_from,
      // @ts-expect-error
      (options = { strict: true })
    )
  ) {
    errors.date_of_holiday_from = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }

  if (validator.isEmpty(data.date_of_holiday_from)) {
    errors.date_of_holiday_from = "Date Required.";
  }

  if (
    !validator.isEmpty(data.date_of_holiday_to) &&
    // @ts-expect-error
    !validator.isISO8601(data.date_of_holiday_to, (options = { strict: true }))
  ) {
    errors.date_of_holiday_to = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateHoliday;
