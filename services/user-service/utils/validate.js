const Joi = require("joi");

const username = Joi.string().alphanum().required().min(4);
const password = Joi.string()
  .required()
  .min(8)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .messages({
    "string.pattern.base":
      "Minimum 8 characters, at least one letter, one number and one special character",
  });
const passwordConfirm = Joi.string()
  .required()
  .min(8)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .equal(Joi.ref("password"))
  .messages({
    "string.pattern.base":
      "Minimum 8 characters, at least one letter, one number and one special character",
  })
  .error(new Error("Password confirm must equal to password"));
const email = Joi.string()
  .required()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  });
const fullname = Joi.string().required();
// .regex(/[^a-zA-Z]/, { invert: true })
// .error(new Error("First name can not has speacial character"));

const register = Joi.object({
  password,
  passwordConfirm,
  email,
  fullname,
  username,
});

const login = Joi.object({
  email,
  password,
});

const forgotPassword = Joi.object({
  email,
});

const resetPassword = Joi.object({
  password,
  passwordConfirm,
});

const updatePassword = Joi.object({
  currentPassword: password,
  password,
  passwordConfirm,
});

const updateMe = Joi.object({
  fullname: Joi.string().allow(null, ""),
  about: Joi.string().allow(null, ""),
  livesIn: Joi.string().allow(null, ""),
  workAt: Joi.string().allow(null, ""),
  relationship: Joi.string().allow(null, ""),
  country: Joi.string().allow(null, ""),
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
};
