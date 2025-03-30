const { throwError } = require("../middleware/errorHandler");

const validateInputs = (fields) => {
  Object.entries(fields).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      throwError(`${key} cannot be empty`);
    }
  });
};

module.exports = validateInputs;
