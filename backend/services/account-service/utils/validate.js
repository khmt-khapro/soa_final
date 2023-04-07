const Joi = require("joi")

const username = Joi.string().alphanum().required().min(4)
const password = Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .messages({
        "string.pattern.base":
            "Minimum 8 characters, at least one letter, one number and one special character",
    })

const passwordConfirm = Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .equal(Joi.ref("password"))
    .messages({
        "string.pattern.base":
            "Minimum 8 characters, at least one letter, one number and one special character",
    })
    .error(new Error("Password confirm must equal to password"))

const newPassword = password

const newPasswordConfirm = Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .equal(Joi.ref("newPassword"))
    .messages({
        "string.pattern.base":
            "Minimum 8 characters, at least one letter, one number and one special character",
        "any.only": "Password confirm must equal to password",
    })

const email = Joi.string()
    .required()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    })
const fullname = Joi.string().required()
const token = Joi.string().required().length(64)
// .regex(/[^a-zA-Z]/, { invert: true })
// .error(new Error("First name can not has speacial character"));

const signupSchema = Joi.object({
    password,
    passwordConfirm,
    email,
    fullname,
    username,
})

const signinSchema = Joi.object({
    email,
    password,
})

const forgotPasswordSchema = Joi.object({
    email,
})

const resetPasswordSchema = Joi.object({
    password,
    passwordConfirm,
})

const updatePasswordSchema = Joi.object({
    currentPassword: password,
    password,
    passwordConfirm,
})

const activateAccountSchema = Joi.object({
    token,
})

const createNewPwdSchema = Joi.object({
    token,
    password,
    passwordConfirm,
})

const changePasswordSchema = Joi.object({
    currentPassword: password,
    newPassword,
    newPasswordConfirm,
})

const updateProfileSchema = Joi.object({
    fullname: Joi.string().allow(null, ""),
    bio: Joi.string().allow(null, ""),
    job: Joi.string().allow(null, ""),
    address: Joi.string().allow(null, ""),
    // some more fields
})

module.exports = {
    signupSchema,
    signinSchema,
    createNewPwdSchema,
    activateAccountSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updatePasswordSchema,
    changePasswordSchema,
    updateProfileSchema,
}
