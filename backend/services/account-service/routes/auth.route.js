const express = require("express")
const { register, login } = require("../utils/validate.js")
const { celebrate, errors, Segments } = require("celebrate")
const authController = require("../controllers/auth.controller")
const { verifyToken } = require("../utils/verifyToken")
const router = express.Router()

// router.use(verifyToken);
// router.get("/", catchAsync(GET_ALL_USER));
// router.get("/:id", catchAsync(GET_USER));
// router.put("/updateInfo", catchAsync(UPDATE_ME));
// // router.delete("/:id", verifyToken, deleteUser);
// router.put("/:id/follow", catchAsync(FOLLOW_USER));
// router.put("/:id/unfollow", catchAsync(UNFOLLOW_USER));

router.post(
  "/register",
  celebrate({
    body: register,
  }),
  authController.REGISTER
)
router.post(
  "/login",
  celebrate({
    body: login,
  }),
  authController.LOGIN
)

router.post("/activate-account", authController.ACTIVATE_ACCOUNT)
// router.post("/forgotPassword", authController.FORGOT_PASSWORD);
// router.post("/resetPassword/:token", authController.RESET_PASSWORD);

router.use(errors())
module.exports = router
