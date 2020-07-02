import validator from "validator";

const isEmpty = require("../is-empty");

const validateAddTestInput = (data: any) => {
  let errors: any = {};

  data.institute_id = !isEmpty(data.institute_id) ? data.institute_id : "";
  data.class_id = !isEmpty(data.class_id) ? data.class_id : "";
  data.teacher_id = !isEmpty(data.teacher_id) ? data.teacher_id : "";
  data.subject_id = !isEmpty(data.subject_id) ? data.subject_id : "";
  data.syllabus_content = !isEmpty(data.syllabus_content)
    ? data.syllabus_content
    : "";
  data.test_date = !isEmpty(data.test_date) ? data.test_date : "";

  if (validator.isEmpty(data.institute_id)) {
    errors.institute_id = "Institute_id is not given. Please check.";
  }

  if (validator.isEmpty(data.class_id)) {
    errors.class_id = "Class_id is not given. Please check.";
  }

  if (validator.isEmpty(data.teacher_id)) {
    errors.teacher_id = "Techer_id is not given. Please check.";
  }

  if (validator.isEmpty(data.subject_id)) {
    errors.subject_id = "Subject is not given. Please check.";
  }

  if (!validator.isLength(data.syllabus_content, { min: 5, max: 500 })) {
    errors.syllabus_content = "Letters Range(min/max) -> (5-500)";
  }

  if (validator.isEmpty(data.syllabus_content)) {
    errors.syllabus_content = "Test syllabus is not given. Please check.";
  }
  // @ts-expect-error
  if (!validator.isISO8601(data.test_date, (options = { strict: true }))) {
    errors.test_date = "Invalid Date (or) Format. **(YYYY-MM-DD)";
  }

  if (validator.isEmpty(data.test_date)) {
    errors.test_date = "Test date is not given. Please check.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAddTestInput;
