const express = require("express")
const { register, login } = require("../utils/validate.js")
const { celebrate, errors, Segments } = require("celebrate")
const accountController = require("../controllers/account.controller")
const { verifyToken } = require("../utils/verifyToken")
const router = express.Router()

router.post(
  "/signup",
  celebrate({
    body: register,
  }),
  accountController.signup
)

router.post(
  "/login",
  celebrate({
    body: login,
  }),
  accountController.signin
)

router.use(verifyToken)
router.post("/activate", accountController.activateAccount)

// router.post("/activate-account", authController.ACTIVATE_ACCOUNT)
// router.post("/forgotPassword", authController.FORGOT_PASSWORD);
// router.post("/resetPassword/:token", authController.RESET_PASSWORD);

router.use(errors())
module.exports = router
