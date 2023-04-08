const express = require("express");
const postController = require("../controllers/post.controller")
const { verifyToken } = require("../utils/verifyToken")
const { upload } = require("../utils/cloudinary.js")
const router = express.Router();


router.use(verifyToken);

router.post(
    "/create", 
    upload.single("image"), 
    postController.createPost
)

module.exports = router;
