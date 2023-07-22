import { validate } from "../helper/validation";

const validateUserInfo = (params: any) => {
  var rules = {
    firstName: ["required", { type: "max", max: 50 }],
    lastName: ["required", { type: "max", max: 50 }],
    email: ["required", "email"],
    contact: ["required", { type: "min", min: 5 }, { type: "max", max: 15 }],
  };
  return validate(params, rules);
};

export { validateUserInfo };
