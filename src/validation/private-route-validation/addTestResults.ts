import validator from "validator";

const isEmpty = require("../is-empty");

const validateTestResultInput = (data: any) => {
  let errors: any = {};

  data.institute_id = !isEmpty(data.institute_id) ? data.institute_id : "";
  data.class_id = !isEmpty(data.class_id) ? data.class_id : "";
  data.teacher_id = !isEmpty(data.teacher_id) ? data.teacher_id : "";
  data.syllabus_id = !isEmpty(data.syllabus_id) ? data.syllabus_id : "";
  data.test_results = !isEmpty(data.test_results) ? data.test_results : "";
  data.out_of = !isEmpty(data.test_date) ? data.test_date : "";

  if (validator.isEmpty(data.institute_id)) {
    errors.institute_id = "Institute_id is not given. Please check.";
  }

  if (validator.isEmpty(data.class_id)) {
    errors.class_id = "Class_id is not given. Please check.";
  }

  if (validator.isEmpty(data.teacher_id)) {
    errors.teacher_id = "Techer_id is not given. Please check.";
  }

  if (validator.isEmpty(data.syllabus_id)) {
    errors.syllabus_id = "Syllabus is not given. Please check.";
  }

  if (validator.isEmpty(data.test_results)) {
    errors.test_results = "Test results is not given. Please check.";
  }

  if (validator.isEmpty(data.out_of)) {
    errors.out_of = "Test date is not given. Please check.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateTestResultInput;
