const express = require("express")
const {
    signupSchema,
    signinSchema,
    forgotPasswordSchema,
    activateAccountSchema,
    createNewPwdSchema,
} = require("../utils/validate.js")
const { celebrate, errors, Segments } = require("celebrate")
const accountController = require("../controllers/account.controller")
// const { verifyToken } = require("../utils/verifyToken")
const router = express.Router()

router.post(
    "/signup",
    celebrate({
        body: signupSchema,
    }),
    accountController.signup
)

router.post(
    "/login",
    celebrate({
        body: signinSchema,
    }),
    accountController.signin
)

router.post(
    "/forgot-password",
    celebrate({
        body: forgotPasswordSchema,
    }),
    accountController.forgotPassword
)

router.post(
    "/activate",
    celebrate({ body: activateAccountSchema }),
    accountController.activateAccount
)

router.post(
    "/create-new-password",
    celebrate({ body: createNewPwdSchema }),
    accountController.createNewPassword
)

router.use(errors())
module.exports = router
