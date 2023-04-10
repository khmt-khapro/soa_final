const express = require("express")
const postController = require("../controllers/post.controller")
const { verifyToken } = require("../utils/verifyToken")
const router = express.Router()

// public api
router.get("/top", postController.getPostsTop)
router.get("/latest", postController.getPostsLatest)

router.use(verifyToken)
router.get("/revelant", postController.getPostsRelevant)

router.post("/", postController.createPost)

router.put("/:postID", postController.updatePostContent)

router.post("/:postID/like", postController.likePost)

router.post("/:postID/unlike", postController.unlikePost)

router.post("/:postID/comments", postController.commentPost)

module.exports = router
