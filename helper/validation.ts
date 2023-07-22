/**
 * Validate input errors.
 *
 * @param {object[]} params - Array of input values
 * @param {object[]} rules - Array of input rules
 * @return {object[]} Input errors array
 *
 * @example
 *
 *     validate(params, rules)
 */

const validate = (params: object, rules: any) => {
  var errors = {};
  for (const key in rules) {
    rules[key].forEach((rule: any) => {
      if (typeof rule === "string") {
        errors = checkRule(rule, key, params, errors);
      } else {
        errors = checkRule(rule.type, key, params, errors, rule);
      }
    });
  }
  return errors;
};

/**
 * Check rules.
 *  @param {string} type - Validation type
 *  @param {key} type - Input key
 *  @param {object[]} params - Array of existing error
 * @return {object[]} Input errors array
 *
 * @example
 *
 *    checkRule(rule.type, key, params, errors, rule)
 */

const checkRule = (
  type: any,
  key: any,
  params: any,
  errors: any,
  rules?: any
) => {
  var error = errors[key] ?? [];
  if (type == "required") {
    if (!params[key]) {
      error.push("This field is required.");
      errors[key] = error;
    }
  } else if (type == "email") {
    if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(params[key])) {
      error.push("This must be a valid email address.");
      errors[key] = error;
    }
  } else if (type == "password") {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/.test(params[key]) ||
      params[key].length < 8
    ) {
      error.push(
        "Must have at least 8 characters, upper & lowercase letters, a number and a special character (@#$_&-+()/*'\":;!?~`|€^={}[]<>.,\\)."
      );
      errors[key] = error;
    }
  } else if (type == "confirmation") {
    if (params[key] != params["password"]) {
      error.push("Passwords do not match.");
      errors[key] = error;
    }
  } else if (type == "max") {
    if (
      params[key] &&
      typeof params[key] === "string" &&
      params[key].length > rules.max
    ) {
      error.push(`Must not be longer than ${rules.max} characters.`);
      errors[key] = error;
    } else if (typeof params[key] !== "string" && params[key] > rules.max) {
      error.push(`Must not be greater than ${rules.max}.`);
      errors[key] = error;
    }
  } else if (type == "min") {
    if (
      params[key] &&
      params[key].length &&
      typeof params[key] === "string" &&
      params[key].length < rules.min
    ) {
      error.push(`Must not be shorter than ${rules.min} characters.`);
      errors[key] = error;
    } else if (
      params[key] &&
      params[key].length &&
      typeof params[key] !== "string" &&
      params[key].length &&
      params[key] < rules.min
    ) {
      error.push(`Must not be less than ${rules.min}.`);
      errors[key] = error;
    }
  }
  return errors;
};

export { validate };
