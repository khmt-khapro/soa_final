const express = require("express");
// import { verifyToken } from "../middlewares/auth.middleware.js";
// import catchAsync from "./../utils/catchAsync.js";
const router = express.Router();


// router.use(verifyToken);
// router.get("/", catchAsync(GET_ALL_USER));
// router.get("/:id", catchAsync(GET_USER));
// router.put("/updateInfo", catchAsync(UPDATE_ME));
// // router.delete("/:id", verifyToken, deleteUser);
// router.put("/:id/follow", catchAsync(FOLLOW_USER));
// router.put("/:id/unfollow", catchAsync(UNFOLLOW_USER));

router.get("/", () => {
    console.log('call get all user')
})

module.exports = router;
